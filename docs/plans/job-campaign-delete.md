# Add delete for Jobs and Campaigns (with safe, applicant-preserving guards)

## Context

Every entity in this app currently has Create/Read/Update but no Delete — confirmed across Jobs, Campaigns, Users, Applicants, and Skills (`app/routers/*.py` all stop at PATCH). The immediate need is deleting **Jobs** and **Campaigns**, since those are the two entities admins actively curate and need to clean up (e.g. remove a draft campaign that was created by mistake, or delete a job that's no longer needed).

Campaign status transitions (PUBLISHED → CLOSED) already work today via the existing Edit form (`EditCampaignDrawer.jsx` → `updateCampaign` → `PUT /campaigns/put/{id}`, `app/routers/campaign.py:70-86` sets `campaign.status` with no restriction) — nothing to build there.

Decisions confirmed with the user:
- **Jobs get no new status field.** A Job is only deletable if it is **not currently mapped to any PUBLISHED campaign**. It's fine to delete a job that's only attached to DRAFT/CLOSED campaigns, or to no campaign at all.
- **Campaigns are deletable only when status is DRAFT or CLOSED** (never while PUBLISHED).
- **Applicant records are never deleted**, even when their campaign/job is deleted. Only the `CampaignJobMapping` row (and thus the applicant's link to that posting) goes away — "it would look like he has not applied to anything." This requires `Applicant.mapping_id` to become nullable with `ON DELETE SET NULL`, so deleting a mapping automatically orphans (not destroys) any applicant rows pointing at it.
- There's no confirm-delete UI anywhere in the app yet — this is the first destructive action, so a small reusable confirm dialog needs to be built.

Other CRUD-completeness gaps found (Users delete/deactivate, applicant withdraw, Skills delete, resume file delete) are **out of scope** for this change — noted here so they're not forgotten, but not part of this plan.

## Backend

### 1. Schema/FK changes (new alembic migration, chained after `d41f7c9a2b3e`)
- `app/models/applicant.py`: make `mapping_id` nullable (`Mapped[int | None]`).
- Alter FK constraints (drop + recreate with `ondelete`):
  - `applicants.mapping_id` → `campaign_job_mapping.id`, **`ON DELETE SET NULL`**.
  - `campaign_job_mapping.job_id` → `jobs.id`, **`ON DELETE CASCADE`** (deleting a Job removes its mapping rows, which in turn nulls out any applicants via the rule above).
  - `campaign_job_mapping.campaign_id` → `campaigns.id`, **`ON DELETE CASCADE`**.
  - `job_skills_mapping.job_id` → `jobs.id`, **`ON DELETE CASCADE`** (just tag rows, no applicant impact).
- With these cascades in place, the actual DELETE endpoints only need a business-rule guard, then a plain `DELETE FROM jobs/campaigns` — the database handles cleanup atomically, consistent with how this schema already relies on FKs for integrity.

### 2. Schemas
- `app/schemas/applicant.py`: `ReadApplicantCore.mapping_id` and `ReadApplicant.mapping_id` become `int | None` to match the now-nullable column.

### 3. Routers — new endpoints (follow existing `/create`, `/get/{id}`, `/put/{id}`, `/patch/{id}` naming)
- **`app/routers/jobs.py`**: `DELETE /jobs/delete/{job_id}`
  - 404 if job doesn't exist.
  - 403 if `current_user.user_type not in ["ADMIN", "HR"]` (same guard as `update_job`).
  - Query: does any `CampaignJobMapping` for this `job_id` join to a `Campaign` with `status == "PUBLISHED"`? If yes → 409 `"Cannot delete a job that is part of a published campaign."`
  - Otherwise `await db.delete(job)` / `db.execute(delete(Job).where(...))` and commit — cascades handle the rest.
- **`app/routers/campaign.py`**: `DELETE /campaigns/delete/{campaign_id}`
  - 404 if campaign doesn't exist.
  - Ownership check mirroring `update_campaign` (`campaign.hosted_by != current_user.id` → 403).
  - If `campaign.status == "PUBLISHED"` → 409 `"Cannot delete a published campaign; close it first."`
  - Otherwise delete and commit — cascades remove its `CampaignJobMapping` rows (which null out affected applicants).

## Frontend

### 1. New reusable confirm dialog
- `src/components/ui/ConfirmDialog.jsx` (new): thin wrapper around the existing `Modal.jsx` (`src/components/ui/Modal.jsx`) — title, message, confirm/cancel buttons, a `loading` state for the confirm button, and a `tone="danger"` style for the confirm button. This becomes the reusable pattern for all future destructive actions too.

### 2. API functions
- `src/api/jobsApi.js`: add `export const deleteJob = (jobId) => API.delete(\`/jobs/delete/${jobId}\`);`
- `src/api/campaignsApi.js`: add `export const deleteCampaign = (campaignId) => API.delete(\`/campaigns/delete/${campaignId}\`);`

### 3. Wire into the existing detail drawers (same place "Edit" already lives)
- `src/components/drawers/JobDrawer.jsx`: in the `canManage` footer (line ~79-97), add a "Delete job" button next to "Edit job", opening `ConfirmDialog`. On confirm, call `deleteJob(job.id)`; on success close both dialogs and refresh the list; on 409 show the backend's error message via `toast.error(err.response.data.detail)`.
- `src/pages/Jobs/AdminJobs.jsx`: pass an `onDelete` handler down to `JobDrawer` (mirrors how `onEdit` is already threaded through), reload `getJobs()` after a successful delete.
- `src/components/drawers/CampaignDrawer.jsx`: same pattern — add "Delete campaign" next to "Edit campaign" in its footer.
- `src/pages/Campaigns/AdminCampaigns.jsx`: same `onDelete` threading as Jobs, reload `getCampaigns()` after success.

## Verification
1. Run the new alembic migration; confirm `applicants.mapping_id` is nullable and the three FK constraints have the right `ON DELETE` behavior (`\d applicants`, `\d campaign_job_mapping`, `\d job_skills_mapping` in psql, or inspect via the same style of check used for the previous migration).
2. Backend, via a throwaway script or Swagger (same approach as the last fix's verification):
   - Create a Job mapped to a PUBLISHED campaign → `DELETE /jobs/delete/{id}` → expect 409.
   - Close that campaign (or create a second job mapped only to a CLOSED/DRAFT campaign with an applicant attached) → delete the job → expect success, confirm the `CampaignJobMapping` row is gone but the `Applicant` row still exists with `mapping_id = NULL`.
   - Try deleting a PUBLISHED campaign → expect 409; close it, delete again → expect success.
3. Frontend: start dev server, open a Job's detail drawer as HR/Admin → delete a job not in any published campaign → confirm it disappears from the list and a toast confirms success. Try deleting one that *is* in a published campaign → confirm the error toast shows the backend's message. Repeat both cases for Campaigns.

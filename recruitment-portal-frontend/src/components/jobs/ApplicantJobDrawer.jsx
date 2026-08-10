import ApplyJobButton from "./ApplyJobButton";
import Drawer from "../ui/Drawer";
import Badge from "../ui/Badge";

function Detail({ label, children }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <div className="mt-1.5 text-[15px] font-medium text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

export default function ApplicantJobDrawer({
  job,
  application,
  onClose,
  onApplied,
}) {
  return (
    <Drawer
      open={!!job}
      onClose={onClose}
      title={job?.title || "Job details"}
      subtitle="Job details"
      width="lg"
      footer={
        job ? (
          <ApplyJobButton
            job={job}
            application={application}
            onApplied={onApplied}
          />
        ) : null
      }
    >
      {job && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Detail label="Department">{job.department || "N/A"}</Detail>
            <Detail label="Employment type">
              {job.employment_type || "N/A"}
            </Detail>
            <Detail label="Experience">
              {job.experience_required
                ? `${job.experience_required} years`
                : "N/A"}
            </Detail>
            <Detail label="Status">
              <Badge status="OPEN">Open</Badge>
            </Detail>
          </div>

          <div className="rounded-[16px] border border-[var(--color-line)] bg-white px-4 py-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Job description
            </p>
            <div
              className="prose mt-2 max-w-none overflow-x-auto text-[15px] leading-7 text-[var(--color-ink-secondary)]"
              dangerouslySetInnerHTML={{
                __html:
                  job.description || "<p>No description available.</p>",
              }}
            />
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              Required skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills && job.skills.length > 0 ? (
                job.skills.map((skill) => (
                  <Badge key={skill.id} tone="brand">
                    {skill.skill_name}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-[var(--color-ink-secondary)]">
                  No skills specified.
                </p>
              )}
            </div>
          </div>

          {application && (
            <div className="rounded-[16px] border border-[rgba(52,199,89,0.25)] bg-[var(--color-success-soft)] px-4 py-4">
              <h3 className="font-semibold text-[#1f8f45]">Already applied</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-secondary)]">
                Current status
              </p>
              <div className="mt-2">
                <Badge status={application.status}>
                  {application.status}
                </Badge>
              </div>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}

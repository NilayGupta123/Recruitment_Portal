import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Field, Label, Select } from "../ui/Input";

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <div className="mt-1.5 text-[15px] font-medium text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

export default function ApplicantDetails({ profile, onStatusUpdate }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (profile) {
      setStatus(profile.status);
    }
  }, [profile]);

  if (!profile) {
    return (
      <Card className="flex h-full items-center justify-center">
        <p className="text-sm text-[var(--color-ink-secondary)]">
          Select an applicant
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-[var(--color-line)] px-4 py-4">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          Applicant details
        </h2>
      </div>
      <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        <Detail label="Full name">{profile.user.full_name}</Detail>
        <Detail label="Email">{profile.user.email}</Detail>
        <Detail label="Phone">{profile.user.phone_number || "—"}</Detail>

        {profile.details?.resume_file_url && (
          <Detail label="Resume">
            <a
              href={profile.details.resume_file_url}
              target="_blank"
              rel="noreferrer"
              className="break-all font-semibold text-[var(--color-brand)] hover:underline"
            >
              {profile.details.resume_file_name || "Open resume"}
            </a>
          </Detail>
        )}

        <Detail label="Current CTC">
          {profile.details?.current_ctc ?? "—"}
        </Detail>
        <Detail label="Expected CTC">
          {profile.details?.expected_ctc ?? "—"}
        </Detail>
        <Detail label="Experience">
          {profile.details?.experience ?? "—"}
        </Detail>

        <Field>
          <Label htmlFor="applicant-status">Status</Label>
          <Select
            id="applicant-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </Select>
        </Field>

        <Button className="w-full" onClick={() => onStatusUpdate(status)}>
          Update status
        </Button>
      </div>
    </Card>
  );
}

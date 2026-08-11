import { useEffect, useMemo, useState } from "react";
import { Download, FileText, Mail, Phone, User } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Field, Label, Select } from "../ui/Input";
import { resolveFileUrl } from "../../utils/fileUrl";
import { buildScoreData } from "./aiScoreUtils";
import AiScoreCard from "./AiScoreCard";
import AiScoreModal from "./AiScoreModal";

const STATUS_OPTIONS = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

function isEmpty(value) {
  return value === null || value === undefined || value === "";
}

function formatCtc(value) {
  if (isEmpty(value)) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  // Values under 1000 are treated as LPA; larger as absolute ₹ amount.
  if (Math.abs(num) < 1000) {
    const text = Number.isInteger(num) ? String(num) : num.toFixed(1);
    return `₹${text} LPA`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

function formatYears(value) {
  if (isEmpty(value)) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  if (num === 1) return "1 year";
  return `${Number.isInteger(num) ? num : num.toFixed(1)} years`;
}

function formatDays(value) {
  if (isEmpty(value)) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  if (num === 1) return "1 day";
  return `${num} days`;
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 py-2">
      {Icon && (
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--color-fill)] text-[var(--color-ink-tertiary)]">
          <Icon size={13} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-[var(--color-ink-tertiary)]">
          {label}
        </p>
        <p className="mt-0.5 break-words text-[13px] font-semibold leading-snug tracking-[-0.01em] text-[var(--color-ink)]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function StatCell({ label, value }) {
  return (
    <div className="rounded-[12px] bg-[var(--color-surface)] px-2.5 py-2 ring-1 ring-inset ring-[var(--color-line)]">
      <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-semibold tabular-nums tracking-[-0.02em] text-[var(--color-ink)]">
        {value || "—"}
      </p>
    </div>
  );
}

export default function ApplicantDetails({ profile, onStatusUpdate }) {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setStatus(profile.status || "Applied");
      setScoreOpen(false);
    }
  }, [profile]);

  const scoreStatus =
    profile?.ai_score_status || profile?.aiScoreStatus || null;
  const scoreData = useMemo(
    () => buildScoreData(profile),
    [profile]
  );

  if (!profile) {
    return (
      <Card className="flex h-full items-center justify-center px-4">
        <p className="text-center text-sm text-[var(--color-ink-secondary)]">
          Select an applicant
        </p>
      </Card>
    );
  }

  const details = profile.details || {};
  const resumeUrl = resolveFileUrl(details.resume_file_url);
  const dirty = status !== profile.status;

  const experience =
    formatYears(details.years_of_experience) ||
    formatYears(details.experience) ||
    null;
  const currentCtc = formatCtc(details.current_ctc);
  const expectedCtc = formatCtc(details.expected_ctc);
  const notice = formatDays(details.notice_period);

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await onStatusUpdate(status);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="border-b border-[var(--color-line)] px-3.5 py-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              Details
            </h2>
            <Badge status={profile.status}>{profile.status}</Badge>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-3.5">
          <AiScoreCard
            scoreData={scoreData}
            status={scoreStatus}
            onOpen={() => setScoreOpen(true)}
          />

          <div className="divide-y divide-[var(--color-line)] rounded-[14px] border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-3">
            <InfoRow
              icon={User}
              label="Name"
              value={profile.user?.full_name}
            />
            <InfoRow
              icon={Mail}
              label="Email"
              value={profile.user?.email}
            />
            <InfoRow
              icon={Phone}
              label="Phone"
              value={profile.user?.phone_number}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatCell label="Current CTC" value={currentCtc} />
            <StatCell label="Expected CTC" value={expectedCtc} />
            <StatCell label="Experience" value={experience} />
            <StatCell label="Notice" value={notice} />
          </div>

          {resumeUrl ? (
            <Button
              as="a"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="sm"
              className="w-full"
              title={details.resume_file_name || "Resume"}
            >
              <FileText size={15} />
              View resume
              <Download size={13} className="opacity-70" />
            </Button>
          ) : (
            <p className="rounded-[12px] border border-dashed border-[var(--color-line-strong)] px-3 py-2.5 text-center text-[12px] text-[var(--color-ink-tertiary)]">
              No resume uploaded
            </p>
          )}

          <div className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-surface-muted)] p-3">
            <Field>
              <Label htmlFor="applicant-status" className="mb-1.5 text-[11px]">
                Status
              </Label>
              <Select
                id="applicant-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="py-2.5 text-[13px]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Field>
            <Button
              className="mt-2.5 w-full"
              size="sm"
              onClick={handleUpdate}
              disabled={!dirty || saving}
            >
              {saving ? "Updating…" : dirty ? "Update status" : "No changes"}
            </Button>
          </div>
        </div>
      </Card>

      <AiScoreModal
        open={scoreOpen}
        onClose={() => setScoreOpen(false)}
        scoreData={scoreData}
        candidateName={profile.user?.full_name}
      />
    </>
  );
}

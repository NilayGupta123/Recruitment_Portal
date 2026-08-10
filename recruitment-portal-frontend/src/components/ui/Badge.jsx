import { cn } from "./cn";

const tones = {
  default:
    "bg-[var(--badge-default-bg)] text-[var(--badge-default-fg)] ring-1 ring-inset ring-[var(--badge-default-ring)]",
  brand:
    "bg-[var(--badge-brand-bg)] text-[var(--badge-brand-fg)] ring-1 ring-inset ring-[var(--badge-brand-ring)]",
  success:
    "bg-[var(--badge-success-bg)] text-[var(--badge-success-fg)] ring-1 ring-inset ring-[var(--badge-success-ring)]",
  warning:
    "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-fg)] ring-1 ring-inset ring-[var(--badge-warning-ring)]",
  danger:
    "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-fg)] ring-1 ring-inset ring-[var(--badge-danger-ring)]",
  accent:
    "bg-[var(--badge-accent-bg)] text-[var(--badge-accent-fg)] ring-1 ring-inset ring-[var(--badge-accent-ring)]",
  neutral:
    "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-fg)] ring-1 ring-inset ring-[var(--badge-neutral-ring)]",
};

const statusMap = {
  Applied: "brand",
  APPLIED: "brand",
  Shortlisted: "success",
  SHORTLISTED: "success",
  Selected: "success",
  SELECTED: "success",
  Interview: "accent",
  INTERVIEW: "accent",
  "Interview Scheduled": "accent",
  Rejected: "danger",
  REJECTED: "danger",
  Hired: "success",
  HIRED: "success",
  PUBLISHED: "success",
  DRAFT: "warning",
  CLOSED: "neutral",
  ACTIVE: "success",
  INACTIVE: "neutral",
  OPEN: "success",
  Available: "success",
};

export default function Badge({ tone, status, className, children }) {
  const resolved = tone || statusMap[status] || "default";

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em]",
        tones[resolved] || tones.default,
        className
      )}
    >
      <span className="truncate normal-case tracking-[-0.01em]">
        {children ?? status}
      </span>
    </span>
  );
}

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

export default function NextActionCard({ application }) {
  if (!application) {
    return (
      <EmptyState
        title="No applications yet"
        description="Apply to open roles to see your next recommended action here."
      />
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
            Next action
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            {application.job_title}
          </h2>
        </div>
        <Badge status={application.status}>{application.status}</Badge>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[14px] bg-[var(--color-canvas)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-tertiary)]">
            Status
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
            {application.status}
          </p>
        </div>
        <div className="rounded-[14px] bg-[var(--color-canvas)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-tertiary)]">
            Applied
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
            {new Date(application.applied_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
}

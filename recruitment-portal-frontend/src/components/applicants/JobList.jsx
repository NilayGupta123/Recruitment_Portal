import Card from "../ui/Card";

export default function JobList({ jobs, selectedJob, onSelect }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-[var(--color-line)] px-4 py-4">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          Jobs
        </h2>
      </div>
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {jobs.length === 0 ? (
          <p className="p-6 text-center text-sm text-[var(--color-ink-secondary)]">
            Select a campaign
          </p>
        ) : (
          jobs.map((job) => {
            const active = selectedJob?.id === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => onSelect(job)}
                className={`w-full border-b border-[var(--color-line)] px-4 py-3.5 text-left transition ${
                  active
                    ? "bg-[var(--color-brand-soft)]"
                    : "hover:bg-[var(--color-canvas)]"
                }`}
              >
                <p className="font-semibold text-[var(--color-ink)]">
                  {job.title}
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-secondary)]">
                  {job.department || "No department"}
                </p>
              </button>
            );
          })
        )}
      </div>
    </Card>
  );
}

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import ApplicantJobDrawer from "../jobs/ApplicantJobDrawer";
import Drawer from "../ui/Drawer";
import EmptyState from "../ui/EmptyState";

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

export default function ApplicantCampaignDrawer({
  campaign,
  jobs,
  applications,
  onClose,
}) {
  const [selectedJob, setSelectedJob] = useState(null);

  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "—";

  return (
    <>
      <Drawer
        open={!!campaign}
        onClose={onClose}
        title={campaign?.title || "Campaign"}
        subtitle="Campaign details"
        width="lg"
      >
        {campaign && (
          <div className="space-y-5">
            <div className="rounded-[16px] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                Description
              </p>
              <div className="mt-2 text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                {campaign.description || "No description available."}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Detail label="Location">
                {campaign.location || "Remote"}
              </Detail>
              <Detail label="Duration">
                {formatDate(campaign.start_date)} –{" "}
                {formatDate(campaign.end_date)}
              </Detail>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                Available jobs
              </h3>

              {jobs.length === 0 ? (
                <EmptyState
                  title="No jobs available"
                  description="This campaign doesn’t have open roles yet."
                />
              ) : (
                <div className="space-y-2.5">
                  {jobs.map((job) => (
                    <button
                      key={job.mapping_id}
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="pressable flex w-full items-center justify-between gap-3 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-4 text-left transition hover:bg-[var(--color-fill)]"
                    >
                      <div className="min-w-0">
                        <h4 className="truncate text-[15px] font-semibold text-[var(--color-ink)]">
                          {job.title}
                        </h4>
                        <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                          {job.department || "No department"}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className="shrink-0 text-[var(--color-ink-tertiary)]"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <ApplicantJobDrawer
        job={selectedJob}
        application={selectedJob ? applications[selectedJob.mapping_id] : null}
        onClose={() => setSelectedJob(null)}
        onApplied={() => {}}
      />
    </>
  );
}

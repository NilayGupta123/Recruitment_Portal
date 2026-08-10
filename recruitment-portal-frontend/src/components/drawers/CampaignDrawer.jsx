import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import JobDrawer from "./JobDrawer";
import { getCampaignJobs } from "../../api/campaignJobApi";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
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

export default function CampaignDrawer({ campaign, onClose, onEdit, onEditJob }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign) {
      loadCampaignJobs();
    }
  }, [campaign]);

  const loadCampaignJobs = async () => {
    try {
      setLoading(true);
      const response = await getCampaignJobs(campaign.id);
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const canManage = user?.user_type === "ADMIN" || user?.user_type === "HR";

  return (
    <>
      <Drawer
        open={!!campaign}
        onClose={onClose}
        title="Campaign details"
        subtitle={campaign?.title}
        width="lg"
        footer={
          canManage ? (
            <Button className="w-full" onClick={() => onEdit(campaign)}>
              Edit campaign
            </Button>
          ) : null
        }
      >
        {campaign && (
          <div className="space-y-4">
            <Detail label="Title">{campaign.title}</Detail>
            <Detail label="Status">
              <Badge status={campaign.status}>{campaign.status}</Badge>
            </Detail>
            <Detail label="Location">{campaign.location || "N/A"}</Detail>
            <div className="grid grid-cols-2 gap-3">
              <Detail label="Start date">{campaign.start_date || "N/A"}</Detail>
              <Detail label="End date">{campaign.end_date || "N/A"}</Detail>
            </div>
            <div className="rounded-[16px] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                Description
              </p>
              <div
                className="prose mt-2 max-w-none text-[15px] leading-7 text-[var(--color-ink-secondary)]"
                dangerouslySetInnerHTML={{
                  __html:
                    campaign.description ||
                    "<p>No description available.</p>",
                }}
              />
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                Jobs in this campaign
              </h3>

              {loading ? (
                <p className="text-sm text-[var(--color-ink-secondary)]">
                  Loading jobs…
                </p>
              ) : jobs.length === 0 ? (
                <div className="rounded-[16px] border border-dashed border-[var(--color-line-strong)] px-4 py-8 text-center text-sm text-[var(--color-ink-secondary)]">
                  No jobs assigned to this campaign.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {jobs.map((job) => (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="pressable flex w-full items-center justify-between gap-3 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-4 text-left transition hover:bg-[var(--color-fill)]"
                    >
                      <div className="min-w-0">
                        <h4 className="truncate font-semibold text-[var(--color-ink)]">
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

      <JobDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onEdit={(job) => {
          setSelectedJob(null);
          onEditJob(job);
        }}
      />
    </>
  );
}

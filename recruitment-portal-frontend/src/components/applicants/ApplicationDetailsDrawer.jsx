import { Check } from "lucide-react";
import Drawer from "../ui/Drawer";
import Badge from "../ui/Badge";

const steps = ["Applied", "Shortlisted", "Interview Scheduled", "Selected"];

export default function ApplicationDetailsDrawer({ application, onClose }) {
  const currentStep = application ? steps.indexOf(application.status) : -1;

  const nextCopy = {
    Applied:
      "Your application has been received. The HR team will review it shortly.",
    Shortlisted:
      "Congratulations! Your profile has been shortlisted. Stay tuned for interview details.",
    "Interview Scheduled":
      "Check your email regularly for interview instructions and timing.",
    Selected:
      "Congratulations! You have been selected. Expect further communication from HR.",
    Rejected: "Don't be discouraged. Continue applying for other opportunities.",
  };

  return (
    <Drawer
      open={!!application}
      onClose={onClose}
      title={application?.job_title || "Application"}
      subtitle="Application details"
      width="lg"
    >
      {application && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                Job
              </p>
              <p className="mt-1.5 text-[15px] font-semibold text-[var(--color-ink)]">
                {application.job_title}
              </p>
            </div>
            <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                Applied on
              </p>
              <p className="mt-1.5 text-[15px] font-semibold text-[var(--color-ink)]">
                {new Date(application.applied_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              Current status
            </h3>
            <Badge status={application.status}>{application.status}</Badge>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              Application progress
            </h3>

            {application.status === "Rejected" ? (
              <div className="rounded-[16px] border border-[rgba(255,69,58,0.2)] bg-[var(--color-danger-soft)] px-4 py-4">
                <h4 className="font-semibold text-[var(--color-danger)]">
                  Application rejected
                </h4>
                <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                  Unfortunately your application wasn't selected.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const completed = index <= currentStep;
                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          completed
                            ? "bg-[var(--color-success-soft)] text-[#1f8f45]"
                            : "bg-black/[0.05] text-[var(--color-ink-tertiary)]"
                        }`}
                      >
                        {completed ? <Check size={18} /> : index + 1}
                      </div>
                      <p
                        className={`font-semibold ${
                          completed
                            ? "text-[var(--color-ink)]"
                            : "text-[var(--color-ink-tertiary)]"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-[16px] border border-[rgba(0,113,227,0.16)] bg-[var(--color-brand-soft)] px-4 py-4">
            <h3 className="font-semibold text-[var(--color-brand)]">
              What's next?
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-secondary)]">
              {nextCopy[application.status] ||
                "We'll notify you when there's an update."}
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
}

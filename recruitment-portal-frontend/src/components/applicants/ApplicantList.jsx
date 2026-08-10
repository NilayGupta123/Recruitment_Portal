import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";

export default function ApplicantList({
  applicants,
  selectedApplicant,
  onSelect,
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-[var(--color-line)] px-4 py-4">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          Applicants
        </h2>
      </div>
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {applicants.length === 0 ? (
          <p className="p-6 text-center text-sm text-[var(--color-ink-secondary)]">
            No applicants found
          </p>
        ) : (
          applicants.map((applicant) => {
            const active =
              selectedApplicant?.application_id === applicant.application_id;
            return (
              <button
                key={applicant.application_id}
                type="button"
                onClick={() => onSelect(applicant)}
                className={`w-full border-b border-[var(--color-line)] px-4 py-3.5 text-left transition ${
                  active
                    ? "bg-[var(--color-brand-soft)]"
                    : "hover:bg-[var(--color-canvas)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={applicant.full_name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[var(--color-ink)]">
                      {applicant.full_name}
                    </p>
                    <p className="truncate text-sm text-[var(--color-ink-secondary)]">
                      {applicant.email}
                    </p>
                    <div className="mt-2">
                      <Badge status={applicant.status}>
                        {applicant.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </Card>
  );
}

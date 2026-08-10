import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function CampaignList({
  campaigns,
  selectedCampaign,
  onSelect,
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-[var(--color-line)] px-4 py-4">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          Campaigns
        </h2>
      </div>
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {campaigns.length === 0 ? (
          <p className="p-6 text-center text-sm text-[var(--color-ink-secondary)]">
            No campaigns
          </p>
        ) : (
          campaigns.map((campaign) => {
            const active = selectedCampaign?.id === campaign.id;
            return (
              <button
                key={campaign.id}
                type="button"
                onClick={() => onSelect(campaign)}
                className={`w-full border-b border-[var(--color-line)] px-4 py-3.5 text-left transition ${
                  active
                    ? "bg-[var(--color-brand-soft)]"
                    : "hover:bg-[var(--color-canvas)]"
                }`}
              >
                <p className="font-semibold text-[var(--color-ink)]">
                  {campaign.title}
                </p>
                <div className="mt-2">
                  <Badge status={campaign.status}>{campaign.status}</Badge>
                </div>
              </button>
            );
          })
        )}
      </div>
    </Card>
  );
}

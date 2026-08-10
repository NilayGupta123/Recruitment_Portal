import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Card, { CardBody, CardHeader } from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function ApplicantCampaignCard({ campaign, onOpen }) {
  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "—";

  return (
    <Card hover className="flex h-full flex-col overflow-hidden">
      <CardHeader>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            {campaign.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-ink-secondary)]">
            {campaign.description || "No description available."}
          </p>
        </div>
        <Badge status={campaign.status}>{campaign.status}</Badge>
      </CardHeader>
      <CardBody className="mt-auto flex flex-1 flex-col justify-end gap-4">
        <div className="space-y-2.5 text-sm text-[var(--color-ink-secondary)]">
          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-[var(--color-brand)]" />
            <span>{campaign.location || "Remote"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar size={15} className="text-[var(--color-brand)]" />
            <span>
              {formatDate(campaign.start_date)} –{" "}
              {formatDate(campaign.end_date)}
            </span>
          </div>
        </div>
        <Button className="w-full" onClick={onOpen}>
          View jobs
          <ArrowRight size={16} />
        </Button>
      </CardBody>
    </Card>
  );
}
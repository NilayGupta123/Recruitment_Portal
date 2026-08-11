import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock3, ArrowRight, Building2 } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <article className="group surface-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="h-1.5 bg-gradient-to-r from-[var(--color-brand)] via-[#5e5ce6] to-[var(--color-accent)]" />
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <Badge tone="brand">{job.department || "General"}</Badge>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-canvas)] text-[var(--color-brand)]">
            <Building2 size={20} />
          </div>
        </div>

        <p className="mt-5 text-[13px] font-semibold text-[var(--color-accent)]">
          {job.campaign_title}
        </p>
        <h2 className="mt-1 line-clamp-2 text-[22px] font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
          {job.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-[var(--color-ink-secondary)]">
          {typeof job.description === "string"
            ? job.description.replace(/<[^>]+>/g, " ")
            : "Explore this role and apply in minutes."}
        </p>

        <div className="my-6 h-px bg-[var(--color-line)]" />

        <div className="space-y-3 text-[14px] text-[var(--color-ink-secondary)]">
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-[var(--color-accent)]" />
            <span>{job.campaign_location || "India"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Briefcase size={16} className="text-[var(--color-accent)]" />
            <span>{job.employment_type || "Full-Time"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock3 size={16} className="text-[var(--color-accent)]" />
            <span>
              {job.experience_required != null
                ? `${job.experience_required} years experience`
                : "Experience flexible"}
            </span>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Company
            </p>
            <p className="text-sm font-semibold text-[var(--color-ink)]">RecruitPro</p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate(`/careers/job/${job.mapping_id}`)}
            className="gap-1.5"
          >
            View details
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}

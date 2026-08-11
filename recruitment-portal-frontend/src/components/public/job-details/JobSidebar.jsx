import {
  Building2,
  MapPin,
  Briefcase,
  Clock3,
  IndianRupee,
  Calendar,
  Bookmark,
  Share2,
  ArrowRight,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Card from "../../ui/Card";

export default function JobSidebar({ job }) {
  const navigate = useNavigate();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this opportunity: ${job.title}`,
          url,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Job link copied to clipboard!");
    }
  };

  const rows = [
    { icon: Briefcase, label: "Department", value: job.department },
    {
      icon: Clock3,
      label: "Experience",
      value:
        job.experience_required != null
          ? `${job.experience_required} years`
          : "Flexible",
    },
    { icon: MapPin, label: "Location", value: job.location || "India" },
    { icon: Building2, label: "Employment", value: job.employment_type },
    {
      icon: IndianRupee,
      label: "Salary",
      value:
        job.salary_min != null && job.salary_max != null
          ? `₹${job.salary_min}–${job.salary_max}`
          : "Not disclosed",
    },
    { icon: Calendar, label: "Posted", value: "Recently" },
  ];

  return (
    <div className="sticky top-28 space-y-5">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-[var(--color-brand)] to-[#5e5ce6] px-6 py-8 text-center text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[var(--color-brand)]">
            <Building2 size={30} />
          </div>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
            RecruitPro
          </h2>
          <p className="mt-1 text-sm text-white/75">Smart recruitment platform</p>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Job overview
          </h3>
          <div className="mt-5 space-y-3.5">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-sm text-[var(--color-ink-secondary)]">
                    <Icon size={16} className="text-[var(--color-brand)]" />
                    {row.label}
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-ink)]">
                    {row.value || "—"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-7 space-y-2.5">
            <Button
              variant="accent"
              className="w-full"
              onClick={() => navigate(`/careers/job/${job.mapping_id}/apply`)}
            >
              Apply now
              <ArrowRight size={16} />
            </Button>
            <Button variant="outline" className="w-full">
              <Bookmark size={16} />
              Save job
            </Button>
            <Button variant="ghost" className="w-full" onClick={handleShare}>
              <Share2 size={16} />
              Share job
            </Button>
          </div>
        </div>
      </Card>

      <div className="rounded-[22px] bg-gradient-to-br from-[var(--color-accent)] to-[#ff6b00] p-6 text-white shadow-[var(--shadow-soft)]">
        <h3 className="text-xl font-semibold tracking-[-0.02em]">
          Why join RecruitPro?
        </h3>
        <ul className="mt-5 space-y-3 text-sm text-white/90">
          {[
            "Flexible hybrid work",
            "Annual performance bonus",
            "Learning budget",
            "Health insurance",
            "Paid certifications",
            "Clear career growth",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

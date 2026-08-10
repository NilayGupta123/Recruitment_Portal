import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock3,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Badge from "../../ui/Badge";

export default function JobHero({ job }) {
  const navigate = useNavigate();

  const stats = [
    { icon: Building2, label: "Department", value: job.department },
    { icon: Briefcase, label: "Job type", value: job.employment_type },
    { icon: MapPin, label: "Location", value: job.location || "India" },
    {
      icon: Clock3,
      label: "Experience",
      value:
        job.experience_required != null
          ? `${job.experience_required} years`
          : "Flexible",
    },
  ];

  const plainDescription =
    typeof job.description === "string"
      ? job.description.replace(/<[^>]+>/g, " ").slice(0, 220)
      : "";

  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#0a3d91] to-[#5e5ce6]" />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[rgba(0,113,227,0.35)] blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[rgba(255,159,10,0.22)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <button
          type="button"
          onClick={() => navigate("/careers")}
          className="pressable mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to careers
        </button>

        <div className="max-w-3xl">
          <Badge tone="accent" className="bg-[rgba(255,159,10,0.2)] text-[#ffd60a]">
            Now hiring
          </Badge>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.75rem)] font-semibold tracking-[-0.04em] text-white">
            {job.title}
          </h1>
          {plainDescription && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
              {plainDescription}
              {job.description?.length > 220 ? "…" : ""}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-[#ffd60a]">
                  <Icon size={16} />
                  {item.label}
                </div>
                <p className="mt-2 text-[15px] font-semibold text-white">
                  {item.value || "—"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

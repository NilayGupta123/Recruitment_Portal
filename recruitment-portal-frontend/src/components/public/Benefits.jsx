import {
  HeartPulse,
  Laptop,
  GraduationCap,
  Plane,
  Coffee,
  Shield,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: HeartPulse,
      title: "Healthcare",
      desc: "Comprehensive medical insurance for employees and dependents.",
    },
    {
      icon: Laptop,
      title: "Hybrid work",
      desc: "Flexible office and remote culture built around deep work.",
    },
    {
      icon: GraduationCap,
      title: "Learning",
      desc: "Sponsored certifications and an annual learning budget.",
    },
    {
      icon: Plane,
      title: "Paid leave",
      desc: "Generous vacation and parental leave so rest is real.",
    },
    {
      icon: Coffee,
      title: "Great culture",
      desc: "Team rituals, hackathons, and moments that build belonging.",
    },
    {
      icon: Shield,
      title: "Clear growth",
      desc: "Transparent career paths with long-term opportunity.",
    },
  ];

  return (
    <section id="benefits" className="bg-[var(--color-canvas)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Benefits & perks
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-semibold tracking-[-0.035em] text-[var(--color-ink)]">
            Why you’ll love working here
          </h2>
          <p className="mt-5 text-[16px] leading-7 text-[var(--color-ink-secondary)]">
            We invest in people with flexibility, benefits, and opportunities that
            support both craft and life outside work.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="surface-card p-7 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(255,159,10,0.14)] text-[var(--color-accent)]">
                  <Icon size={26} />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

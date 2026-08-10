import {
  HeartPulse,
  Laptop,
  GraduationCap,
  Plane,
  Coffee,
  ShieldCheck,
} from "lucide-react";

export default function CompanyBenefits() {
  const benefits = [
    { icon: <HeartPulse size={22} />, title: "Health insurance" },
    { icon: <Laptop size={22} />, title: "Hybrid work" },
    { icon: <GraduationCap size={22} />, title: "Learning budget" },
    { icon: <Plane size={22} />, title: "Paid leave" },
    { icon: <Coffee size={22} />, title: "Team events" },
    { icon: <ShieldCheck size={22} />, title: "Job security" },
  ];

  return (
    <section className="surface-card p-8 sm:p-10">
      <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
        Benefits & perks
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-[18px] border border-[var(--color-line)] bg-white p-5 transition hover:shadow-[var(--shadow-lift)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[rgba(255,159,10,0.14)] text-[var(--color-accent)]">
              {benefit.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink-secondary)]">
              We believe happy employees build better products.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { FileText, Search, Users, BadgeCheck, Briefcase } from "lucide-react";

export default function HiringProcess() {
  const steps = [
    {
      icon: <FileText size={22} />,
      title: "Apply",
      desc: "Submit your application online.",
    },
    {
      icon: <Search size={22} />,
      title: "Screening",
      desc: "Our recruiters review your profile.",
    },
    {
      icon: <Users size={22} />,
      title: "Interview",
      desc: "Technical & HR interview rounds.",
    },
    {
      icon: <BadgeCheck size={22} />,
      title: "Offer",
      desc: "Receive your offer letter.",
    },
    {
      icon: <Briefcase size={22} />,
      title: "Join",
      desc: "Welcome to the team.",
    },
  ];

  return (
    <section className="surface-card p-8 sm:p-10">
      <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
        Hiring process
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step.title} className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand)] text-white shadow-[0_1px_2px_rgba(0,113,227,0.25)]">
              {step.icon}
            </div>
            {index !== steps.length - 1 && (
              <div className="absolute top-7 left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-[rgba(0,113,227,0.18)] md:block" />
            )}
            <h3 className="mt-4 font-semibold text-[var(--color-ink)]">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-[var(--color-ink-secondary)]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

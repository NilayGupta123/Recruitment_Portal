import { User, Briefcase, FileText, CheckCircle2 } from "lucide-react";

export default function Stepper({ step }) {
  const steps = [
    { number: 1, title: "Personal", icon: <User size={18} /> },
    { number: 2, title: "Professional", icon: <Briefcase size={18} /> },
    { number: 3, title: "Resume", icon: <FileText size={18} /> },
    { number: 4, title: "Review", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-6 py-7 sm:px-10">
      <div className="flex items-center justify-between gap-2">
        {steps.map((item, index) => (
          <div key={item.number} className="flex flex-1 items-center">
            <div className="flex w-full flex-col items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full font-semibold transition ${
                  step >= item.number
                    ? "bg-[var(--color-brand)] text-white shadow-[0_1px_2px_rgba(0,113,227,0.25)]"
                    : "bg-white text-[var(--color-ink-tertiary)] ring-1 ring-[var(--color-line-strong)]"
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`mt-2.5 text-sm font-semibold ${
                  step >= item.number
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-tertiary)]"
                }`}
              >
                {item.title}
              </p>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`mx-1 h-0.5 flex-1 rounded-full ${
                  step > item.number
                    ? "bg-[var(--color-brand)]"
                    : "bg-[var(--color-line-strong)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

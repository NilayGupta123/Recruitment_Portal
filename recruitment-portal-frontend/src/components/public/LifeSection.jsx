import { Users, Sparkles, Rocket } from "lucide-react";
import Button from "../ui/Button";

export default function LifeSection() {
  const cards = [
    {
      icon: Users,
      title: "Collaborative culture",
      desc: "Work with talented people who support each other and celebrate every win.",
    },
    {
      icon: Rocket,
      title: "Career growth",
      desc: "Upskill with mentorship, training programs, and meaningful projects.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      desc: "Build products that impact thousands of users with modern technology.",
    },
  ];

  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Life at RecruitPro
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.035em] text-[var(--color-ink)]">
              Work where ideas become{" "}
              <span className="text-[var(--color-brand)]">reality.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--color-ink-secondary)]">
              People do their best work when they are empowered, challenged, and
              appreciated — every day.
            </p>
            <Button
              className="mt-9"
              onClick={() =>
                document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore careers
            </Button>
          </div>

          <div className="grid gap-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex gap-4 rounded-[22px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-5 transition-shadow hover:shadow-[var(--shadow-soft)] sm:p-6"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-white shadow-[0_8px_20px_rgba(0,113,227,0.22)]">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

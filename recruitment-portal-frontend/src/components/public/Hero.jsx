import { Search, MapPin, Briefcase } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/70 via-[#0b1220]/55 to-[#f5f5f7]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-10 sm:px-6">
        <div className="max-w-3xl animate-rise-in">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd60a]">
            Build your future
          </p>
          <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
            Find work that
            <br />
            feels like you
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            Join a team where craft, collaboration, and growth shape every role —
            from first interview to first day.
          </p>
        </div>

        <div className="mt-12 rounded-[24px] border border-white/40 bg-white/90 p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl sm:p-5 animate-rise-in">
          <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3.5">
              <Search size={18} className="text-[var(--color-ink-tertiary)]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Search
                </span>
                <input
                  placeholder="Job title or keyword"
                  className="w-full bg-transparent text-[15px] font-medium text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-tertiary)]"
                />
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3.5">
              <MapPin size={18} className="text-[var(--color-ink-tertiary)]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Location
                </span>
                <input
                  placeholder="Anywhere"
                  className="w-full bg-transparent text-[15px] font-medium text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-tertiary)]"
                />
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3.5">
              <Briefcase size={18} className="text-[var(--color-ink-tertiary)]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
                  Department
                </span>
                <select className="w-full bg-transparent text-[15px] font-medium text-[var(--color-ink)] outline-none">
                  <option>All departments</option>
                  <option>Engineering</option>
                  <option>HR</option>
                  <option>Marketing</option>
                </select>
              </span>
            </label>

            <Button
              variant="accent"
              size="lg"
              className="h-auto min-h-[64px] rounded-2xl px-7"
              onClick={() => {
                document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Find roles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

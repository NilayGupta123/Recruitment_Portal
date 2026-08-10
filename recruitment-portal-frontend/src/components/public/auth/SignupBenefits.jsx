import {
  Briefcase,
  FileText,
  UserCircle,
  Bell,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Card from "../../ui/Card";

export default function SignupBenefits() {
  const benefits = [
    {
      icon: Briefcase,
      title: "Track applications",
      description: "Follow every application from submission to decision.",
    },
    {
      icon: FileText,
      title: "One-click apply",
      description: "Your profile is saved so future applications take seconds.",
    },
    {
      icon: UserCircle,
      title: "Manage your profile",
      description: "Keep experience, education, and skills up to date.",
    },
    {
      icon: Bell,
      title: "Status updates",
      description: "Get notified when your application status changes.",
    },
    {
      icon: ShieldCheck,
      title: "Secure account",
      description: "Personal information and resumes stay protected.",
    },
    {
      icon: Clock,
      title: "Application history",
      description: "Review past applications anytime from your dashboard.",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] bg-gradient-to-br from-[var(--color-brand)] to-[#5e5ce6] p-8 text-white shadow-[var(--shadow-soft)]">
        <h2 className="text-[28px] font-semibold tracking-[-0.03em]">
          Welcome to RecruitPro
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-white/80">
          Create your account to unlock a personalized applicant dashboard and
          manage every stage of your hiring journey.
        </p>
      </div>

      <div className="grid gap-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card key={benefit.title} className="flex gap-4 p-5" hover>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--color-ink-secondary)]">
                  {benefit.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="rounded-[20px] border border-[rgba(255,159,10,0.25)] bg-[rgba(255,159,10,0.08)] p-6">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#b25000]">
          Already applied?
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-secondary)]">
          If you applied with the same email, we’ll connect your account to your
          existing application history.
        </p>
        <ul className="mt-4 space-y-2 text-sm font-medium text-[var(--color-ink)]">
          <li>✓ No duplicate profiles</li>
          <li>✓ Keep previous applications</li>
          <li>✓ Continue where you left off</li>
        </ul>
      </div>
    </div>
  );
}

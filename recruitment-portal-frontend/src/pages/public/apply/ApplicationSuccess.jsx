import {
  CheckCircle2,
  Mail,
  Search,
  Users,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar";
import Footer from "../../../components/public/Footer";
import Button from "../../../components/ui/Button";

export default function ApplicationSuccess() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Mail size={20} />,
      title: "Application received",
      desc: "We've successfully received your application.",
    },
    {
      icon: <Search size={20} />,
      title: "Application review",
      desc: "Our recruitment team will review your profile.",
    },
    {
      icon: <Users size={20} />,
      title: "Interview",
      desc: "Shortlisted candidates will be contacted.",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[var(--color-canvas)] py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="surface-card overflow-hidden">
            <div className="bg-gradient-to-br from-[var(--color-brand)] to-[#0058b0] px-8 py-14 text-center text-white">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[var(--shadow-lift)]">
                <CheckCircle2 size={48} className="text-[#1f8f45]" />
              </div>
              <h1 className="mt-8 text-[32px] font-semibold tracking-[-0.03em]">
                Application submitted
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-white/85">
                Thank you for applying. We've successfully received your
                application.
              </p>
            </div>

            <div className="space-y-8 p-8 sm:p-10">
              <div className="rounded-[18px] border border-[rgba(52,199,89,0.22)] bg-[var(--color-success-soft)] px-5 py-5">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#1f8f45]">
                  You're all set
                </h2>
                <p className="mt-2 text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                  Our recruitment team will review your application. If your
                  profile matches our requirements, we'll contact you via email
                  or phone.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  What happens next?
                </h2>
                <div className="mt-6 space-y-4">
                  {steps.map((step) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--color-ink)]">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[18px] border border-[rgba(255,159,10,0.25)] bg-[rgba(255,159,10,0.1)] px-5 py-5">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  Create an account
                </h2>
                <p className="mt-2 text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                  Since you've already applied, creating an account lets you:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink)]">
                  <li>Track your application status</li>
                  <li>Update your resume anytime</li>
                  <li>Apply faster for future jobs</li>
                  <li>View all your applications</li>
                  <li>Manage your profile</li>
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => navigate("/signup")}
                >
                  Create account
                  <ArrowRight size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/careers")}
                >
                  <Briefcase size={16} />
                  Browse more jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

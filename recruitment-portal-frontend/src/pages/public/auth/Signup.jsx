import Navbar from "../../../components/public/Navbar";
import Footer from "../../../components/public/Footer";
import SignupForm from "../../../components/public/auth/SignupForm";
import SignupBenefits from "../../../components/public/auth/SignupBenefits";

export default function Signup() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-canvas)] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-[var(--color-ink)]">
              Create your RecruitPro account
            </h1>
            <p className="mt-4 text-[16px] leading-7 text-[var(--color-ink-secondary)]">
              Track applications, manage your profile, and apply faster next time.
            </p>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <SignupForm />
            <SignupBenefits />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Navbar from "../../../components/public/Navbar";
import Footer from "../../../components/public/Footer";

import SignupForm from "../../../components/public/auth/SignupForm";
import SignupBenefits from "../../../components/public/auth/SignupBenefits";

export default function Signup() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-16">

        <div className="max-w-7xl mx-auto px-6">

          {/* Page Heading */}

          <div className="text-center mb-14">

            <h1 className="text-5xl font-bold text-slate-900">

              Create Your RecruitPro Account

            </h1>

            <p className="text-lg text-slate-600 mt-5">

              You've already taken the first step by applying.
              Create your account to track applications,
              manage your profile and apply faster in the future.

            </p>

          </div>

          {/* Main Content */}

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left */}

            <SignupForm />

            {/* Right */}

            <SignupBenefits />

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
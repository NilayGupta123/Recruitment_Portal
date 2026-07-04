import {
  Briefcase,
  FileText,
  UserCircle,
  Bell,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function SignupBenefits() {
  const benefits = [
    {
      icon: <Briefcase size={30} />,
      title: "Track Applications",
      description:
        "Monitor every application from submission to final hiring decision.",
    },
    {
      icon: <FileText size={30} />,
      title: "One-Click Apply",
      description:
        "Your profile is saved so future applications take only a few seconds.",
    },
    {
      icon: <UserCircle size={30} />,
      title: "Manage Your Profile",
      description:
        "Keep your experience, education, skills and certifications up to date.",
    },
    {
      icon: <Bell size={30} />,
      title: "Status Notifications",
      description:
        "Receive updates whenever your application status changes.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Secure Account",
      description:
        "Your personal information and resume are stored securely.",
    },
    {
      icon: <Clock size={30} />,
      title: "Application History",
      description:
        "View all your previous applications anytime from your dashboard.",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Card */}

      <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-10 shadow-xl">

        <h2 className="text-4xl font-bold leading-tight">
          Welcome to RecruitPro
        </h2>

        <p className="mt-5 text-blue-100 leading-8 text-lg">
          You've already completed the first step by submitting your
          application.
        </p>

        <p className="mt-4 text-blue-100 leading-8">
          Create your account to unlock your personalized applicant
          dashboard and manage every stage of your recruitment journey.
        </p>

      </div>

      {/* Benefits */}

      <div className="grid gap-6">

        {benefits.map((benefit) => (

          <div
            key={benefit.title}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 p-6 flex gap-5"
          >

            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">

              {benefit.icon}

            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-800">

                {benefit.title}

              </h3>

              <p className="text-slate-600 mt-2 leading-7">

                {benefit.description}

              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Card */}

      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-8">

        <h3 className="text-2xl font-bold text-orange-700">

          Already Applied?

        </h3>

        <p className="mt-4 text-slate-700 leading-7">

          If you previously applied using the same email address, we'll
          automatically connect your account with your existing
          application history.

        </p>

        <div className="mt-6 bg-white rounded-xl p-4 border border-orange-200">

          <p className="font-semibold text-slate-800">

            ✓ No duplicate profiles

          </p>

          <p className="font-semibold text-slate-800 mt-2">

            ✓ Keep all previous applications

          </p>

          <p className="font-semibold text-slate-800 mt-2">

            ✓ Continue exactly where you left off

          </p>

        </div>

      </div>

    </div>
  );
}
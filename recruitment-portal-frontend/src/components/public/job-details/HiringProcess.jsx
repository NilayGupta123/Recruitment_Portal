import {FileText, Search, Users, BadgeCheck, Briefcase} from "lucide-react";
export default function HiringProcess() {
  const steps = [
    {
      icon: <FileText size={28} />,
      title: "Apply",
      desc: "Submit your application online.",
    },
    {
      icon: <Search size={28} />,
      title: "Screening",
      desc: "Our recruiters review your profile.",
    },
    {
      icon: <Users size={28} />,
      title: "Interview",
      desc: "Technical & HR interview rounds.",
    },
    {
      icon: <BadgeCheck size={28} />,
      title: "Offer",
      desc: "Receive your offer letter.",
    },
    {
      icon: <Briefcase size={28} />,
      title: "Join",
      desc: "Welcome to RecruitPro!",
    },
  ];

  return (
    <section className="bg-white rounded-3xl shadow-sm p-10">

      <h2 className="text-3xl font-bold mb-10">
        Hiring Process
      </h2>

      <div className="grid md:grid-cols-5 gap-6">

        {steps.map((step, index) => (

          <div
            key={index}
            className="relative text-center"
          >

            <div className="w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-center mx-auto">

              {step.icon}

            </div>

            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-blue-200 -translate-x-8" />
            )}

            <h3 className="font-bold mt-5">

              {step.title}

            </h3>

            <p className="text-gray-500 text-sm mt-2">

              {step.desc}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
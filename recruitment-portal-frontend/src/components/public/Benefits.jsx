import {HeartPulse, Laptop, GraduationCap, Plane, Coffee, Shield} from "lucide-react";
export default function Benefits() {
  const benefits = [
    {
      icon: <HeartPulse size={32} />,
      title: "Healthcare",
      desc: "Comprehensive medical insurance for employees.",
    },
    {
      icon: <Laptop size={32} />,
      title: "Hybrid Work",
      desc: "Flexible office and remote work culture.",
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Learning",
      desc: "Sponsored certifications and learning budget.",
    },
    {
      icon: <Plane size={32} />,
      title: "Paid Leave",
      desc: "Generous vacation and parental leave policy.",
    },
    {
      icon: <Coffee size={32} />,
      title: "Great Culture",
      desc: "Fun events, hackathons and team outings.",
    },
    {
      icon: <Shield size={32} />,
      title: "Job Security",
      desc: "Long-term growth and transparent career path.",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-orange-500 font-semibold">

            Benefits & Perks

          </p>

          <h2 className="text-5xl font-bold mt-4">

            Why You'll Love Working Here

          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">

            We invest in our people by providing
            opportunities, flexibility and benefits that
            help them succeed professionally and
            personally.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {benefits.map((benefit) => (

            <div
              key={benefit.title}
              className="bg-white rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition"
            >

              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">

                {benefit.icon}

              </div>

              <h3 className="font-bold text-2xl mt-6">

                {benefit.title}

              </h3>

              <p className="text-gray-600 mt-4 leading-7">

                {benefit.desc}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
import {HeartPulse, Laptop, GraduationCap, Plane, Coffee, ShieldCheck} from "lucide-react";
export default function CompanyBenefits() {

  const benefits = [
    {
      icon: <HeartPulse size={28} />,
      title: "Health Insurance",
    },
    {
      icon: <Laptop size={28} />,
      title: "Hybrid Work",
    },
    {
      icon: <GraduationCap size={28} />,
      title: "Learning Budget",
    },
    {
      icon: <Plane size={28} />,
      title: "Paid Leave",
    },
    {
      icon: <Coffee size={28} />,
      title: "Team Events",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Job Security",
    },
  ];

  return (
    <section className="bg-white rounded-3xl shadow-sm p-10">

      <h2 className="text-3xl font-bold mb-10">

        Benefits & Perks

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {benefits.map((benefit) => (

          <div
            key={benefit.title}
            className="border rounded-2xl p-6 hover:shadow-lg transition"
          >

            <div className="w-14 h-14 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">

              {benefit.icon}

            </div>

            <h3 className="font-bold text-xl mt-5">

              {benefit.title}

            </h3>

            <p className="text-gray-500 mt-3">

              We believe happy employees build better products.

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
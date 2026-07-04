import {Users, Sparkles, Rocket} from "lucide-react";
export default function LifeSection() {
  const cards = [
    {
      icon: <Users size={30} />,
      title: "Collaborative Culture",
      desc: "Work with talented people who support each other and celebrate every success.",
    },
    {
      icon: <Rocket size={30} />,
      title: "Career Growth",
      desc: "Upskill with mentorship, training programs and challenging projects.",
    },
    {
      icon: <Sparkles size={30} />,
      title: "Innovation",
      desc: "Build products that impact thousands of users using modern technologies.",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <p className="uppercase tracking-[4px] text-orange-500 font-semibold mb-4">
              Life at RecruitPro
            </p>

            <h2 className="text-5xl font-bold text-slate-900 leading-tight">
              Work where
              <br />
              ideas become
              <span className="text-blue-700">
                {" "}
                reality.
              </span>
            </h2>

            <p className="mt-8 text-gray-600 text-lg leading-8">
              We believe people do their best work when
              they are empowered, challenged and
              appreciated.
            </p>

            <button className="mt-10 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold transition">
              Explore Careers
            </button>

          </div>

          {/* Right */}

          <div className="grid gap-6">

            {cards.map((card) => (

              <div
                key={card.title}
                className="flex gap-5 bg-slate-50 rounded-3xl p-7 hover:shadow-xl transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center">

                  {card.icon}

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    {card.title}

                  </h3>

                  <p className="mt-3 text-gray-600">

                    {card.desc}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
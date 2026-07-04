import {ArrowLeft, Briefcase, MapPin, Clock3, Calendar, Building2} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function JobHero({ job }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900" />

      {/* Decorative circles */}

      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition mb-10"
        >
          <ArrowLeft size={18} />

          Back to Careers
        </button>

        <div className="grid lg:grid-cols-3 gap-12 items-center">

          {/* Left */}

          <div className="lg:col-span-2">

            <span className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold">

              NOW HIRING

            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mt-8 leading-tight">

              {job.title}

            </h1>

            <p className="mt-6 text-xl text-slate-200 leading-9">

              {job.description}

            </p>

            {/* Stats */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

                <div className="flex items-center gap-3 text-orange-400">

                  <Building2 size={22} />

                  Department

                </div>

                <p className="text-white font-semibold mt-3">

                  {job.department}

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

                <div className="flex items-center gap-3 text-orange-400">

                  <Briefcase size={22} />

                  Job Type

                </div>

                <p className="text-white font-semibold mt-3">

                  {job.employment_type}

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

                <div className="flex items-center gap-3 text-orange-400">

                  <MapPin size={22} />

                  Location

                </div>

                <p className="text-white font-semibold mt-3">

                  {job.location || "India"}

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5">

                <div className="flex items-center gap-3 text-orange-400">

                  <Clock3 size={22} />

                  Experience

                </div>

                <p className="text-white font-semibold mt-3">

                  {job.experience_required} Years

                </p>

              </div>

            </div>

          </div>


        </div>

      </div>

    </section>
  );
}
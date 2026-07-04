import { useNavigate } from "react-router-dom";
import {MapPin, Briefcase, Clock3, ArrowRight, Building2} from "lucide-react";
export default function JobCard({ job }) {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/careers/job/${job.id}`);
  };
  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

      {/* Top Banner */}

      <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />

      <div className="p-7">

        {/* Department */}

        <div className="flex items-center justify-between">

          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">

            {job.department || "General"}

          </span>

          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">

            <Building2
              size={22}
              className="text-blue-700"
            />

          </div>

        </div>

        {/* Title */}

        <h2 className="text-2xl font-bold text-slate-900 mt-6 line-clamp-2">

          {job.title}

        </h2>

        {/* Description */}

        <p className="text-gray-600 mt-4 leading-7 line-clamp-3">

          {job.description}

        </p>

        {/* Divider */}

        <div className="border-t my-7" />

        {/* Details */}

        <div className="space-y-4">

          <div className="flex items-center gap-3 text-gray-700">

            <MapPin
              size={18}
              className="text-orange-500"
            />

            <span>

              {job.location || "India"}

            </span>

          </div>

          <div className="flex items-center gap-3 text-gray-700">

            <Briefcase
              size={18}
              className="text-orange-500"
            />

            <span>

              {job.employment_type || "Full-Time"}

            </span>

          </div>

          <div className="flex items-center gap-3 text-gray-700">

            <Clock3
              size={18}
              className="text-orange-500"
            />

            <span>

              {job.experience_required} Years Experience

            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-xs text-gray-500">

              Company

            </p>

            <p className="font-semibold">

              RecruitPro

            </p>

          </div>

          <button
            onClick={handleViewDetails}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 transition px-6 py-3 rounded-xl text-white font-semibold"
          >

            View Details

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}
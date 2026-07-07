import {Building2, MapPin, Briefcase, Clock3, IndianRupee, Calendar, Bookmark, Share2, ArrowRight} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function JobSidebar({ job }) {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/careers/job/${job.id}/apply`);
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this opportunity: ${job.title}`,
          url,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Job link copied to clipboard!");
    }
  };

  return (
    <div className="sticky top-28 space-y-6">

      {/* Apply Card */}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white">

          <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mx-auto">

            <Building2
              className="text-blue-700"
              size={42}
            />

          </div>

          <h2 className="text-2xl font-bold text-center mt-6">

            RecruitPro

          </h2>

          <p className="text-center text-blue-100 mt-2">

            Smart Recruitment Platform

          </p>

        </div>

        {/* Details */}

        <div className="p-8">

          <h3 className="text-xl font-bold mb-6">

            Job Overview

          </h3>

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Briefcase
                  className="text-blue-700"
                  size={20}
                />

                <span className="text-gray-600">

                  Department

                </span>

              </div>

              <span className="font-semibold">

                {job.department}

              </span>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Clock3
                  className="text-blue-700"
                  size={20}
                />

                <span className="text-gray-600">

                  Experience

                </span>

              </div>

              <span className="font-semibold">

                {job.experience_required} Years

              </span>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <MapPin
                  className="text-blue-700"
                  size={20}
                />

                <span className="text-gray-600">

                  Location

                </span>

              </div>

              <span className="font-semibold">

                {job.location || "India"}

              </span>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Building2
                  className="text-blue-700"
                  size={20}
                />

                <span className="text-gray-600">

                  Employment

                </span>

              </div>

              <span className="font-semibold">

                {job.employment_type}

              </span>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <IndianRupee
                  className="text-blue-700"
                  size={20}
                />

                <span className="text-gray-600">

                  Salary

                </span>

              </div>

              <span className="font-semibold">

                ₹8-15 LPA

              </span>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Calendar
                  className="text-blue-700"
                  size={20}
                />

                <span className="text-gray-600">

                  Posted

                </span>

              </div>

              <span className="font-semibold">

                Recently

              </span>

            </div>

          </div>

          {/* Buttons */}

          <button
            onClick={handleApply}
            className="w-full mt-10 bg-orange-500 hover:bg-orange-600 transition rounded-2xl py-4 text-white font-bold flex justify-center items-center gap-3"
          >

            Apply Now

            <ArrowRight size={20} />

          </button>

          <button
            className="w-full mt-4 border-2 border-blue-700 text-blue-700 rounded-2xl py-4 hover:bg-blue-700 hover:text-white transition flex justify-center items-center gap-3"
          >

            <Bookmark size={18} />

            Save Job

          </button>

          <button
            onClick={handleShare}
            className="w-full mt-4 border rounded-2xl py-4 hover:bg-slate-100 transition flex justify-center items-center gap-3"
          >

            <Share2 size={18} />

            Share Job

          </button>

        </div>

      </div>

      {/* Why Join */}

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white">

        <h3 className="text-2xl font-bold">

          Why Join RecruitPro?

        </h3>

        <ul className="mt-6 space-y-4">

          <li>
            ✓ Flexible Hybrid Work
          </li>

          <li>
            ✓ Annual Performance Bonus
          </li>

          <li>
            ✓ Learning Budget
          </li>

          <li>
            ✓ Health Insurance
          </li>

          <li>
            ✓ Paid Certifications
          </li>

          <li>
            ✓ Career Growth Opportunities
          </li>

        </ul>

      </div>

    </div>
  );
}
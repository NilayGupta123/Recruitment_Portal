import {
  FaTimes,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";

import ApplyJobButton from "./ApplyJobButton";

const statusColor = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  "Interview Scheduled":
    "bg-purple-100 text-purple-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ApplicantJobDrawer({
  job,
  application,
  onClose,
  onApplied,
}) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

      {/* Drawer */}

      <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold">
              {job.title}
            </h2>

            <p className="text-gray-500">
              Job Details
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Information */}

          <div className="grid grid-cols-2 gap-5">

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <FaBuilding className="text-blue-600" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Department
                  </p>

                  <h3 className="font-semibold">
                    {job.department}
                  </h3>

                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <FaBriefcase className="text-green-600" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Employment Type
                  </p>

                  <h3 className="font-semibold">
                    {job.employment_type}
                  </h3>

                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <FaClock className="text-purple-600" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Experience
                  </p>

                  <h3 className="font-semibold">
                    {job.experience_required} Years
                  </h3>

                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <FaFileAlt className="text-orange-600" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Status
                  </p>

                  <h3 className="font-semibold text-green-600">
                    Open
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Description */}

          <div>

            <h3 className="text-xl font-bold mb-3">
              Job Description
            </h3>

            <div className="bg-gray-50 rounded-xl p-5 leading-7 whitespace-pre-line">

              {job.description || "No description available."}

            </div>

          </div>

          {/* Skills */}

          <div>

            <h3 className="text-xl font-bold mb-3">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              {job.skills &&
              job.skills.length > 0 ? (
                job.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                  >
                    {skill.skill_name}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">
                  No skills specified.
                </p>
              )}

            </div>

          </div>

          {/* Already Applied */}

          {application && (

            <div className="rounded-xl border border-green-300 bg-green-50 p-5">

              <h3 className="text-lg font-bold text-green-700">
                ✔ Already Applied
              </h3>

              <p className="mt-2">
                Current Status
              </p>

              <span
                className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  statusColor[
                    application.status
                  ] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {application.status}
              </span>

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="border-t p-6">

          <ApplyJobButton
            job={job}
            application={application}
            onApplied={onApplied}
          />

        </div>

      </div>

    </div>
  );
}
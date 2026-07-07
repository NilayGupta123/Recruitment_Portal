import { useState } from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";

import { applyToJob } from "../../api/applicantApi";

const badgeColor = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  "Interview Scheduled":
    "bg-purple-100 text-purple-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ApplyJobButton({
  job,
  application,
  onApplied,
}) {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);

      await applyToJob(job.id);

      toast.success(
        "Application submitted successfully!"
      );

      if (onApplied) {
        await onApplied();
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.detail ||
          "Failed to apply."
      );
    } finally {
      setLoading(false);
    }
  };

  // Already Applied
  if (application) {
    return (
      <div className="space-y-4">

        <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 p-4">

          <FaCheckCircle
            className="text-green-600"
            size={24}
          />

          <div>

            <h3 className="font-bold text-green-700">
              You have already applied
            </h3>

            <p className="text-sm text-gray-600">
              Current application status
            </p>

          </div>

        </div>

        <div className="flex justify-between items-center">

          <span
            className={`px-4 py-2 rounded-full font-semibold text-sm ${
              badgeColor[
                application.status
              ] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {application.status}
          </span>

          <button
            disabled
            className="px-6 py-3 rounded-xl bg-gray-300 text-gray-600 cursor-not-allowed font-semibold"
          >
            Already Applied
          </button>

        </div>

      </div>
    );
  }

  // Not Applied
  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="w-full flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition"
    >
      <FaPaperPlane />

      {loading
        ? "Submitting..."
        : "Apply Now"}
    </button>
  );
}
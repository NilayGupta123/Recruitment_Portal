import { useAuth } from "../../context/AuthContext";

export default function JobDrawer({
  job,
  onClose,
  onEdit,
}) {
  const { user } = useAuth();

  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[500px] h-full bg-white shadow-xl p-6 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Job Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Job Information */}
        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Title
            </p>

            <p className="font-semibold text-lg">
              {job.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Department
            </p>

            <p>{job.department || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Employment Type
            </p>

            <p>{job.employment_type || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Experience Required
            </p>

            <p>
              {job.experience_required
                ? `${job.experience_required} Years`
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Description
            </p>

          <div
            className="prose max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                job.description ||
                "<p>No description available</p>",
            }}
          />
          </div>

        </div>

        {/* Actions */}
        {(user?.user_type === "ADMIN" ||
          user?.user_type === "HR") && (
          <div className="mt-8">
            <button
              onClick={() => onEdit(job)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
            >
              Edit Job
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
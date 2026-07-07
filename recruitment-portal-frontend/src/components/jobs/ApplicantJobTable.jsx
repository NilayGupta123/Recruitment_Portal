import {
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUserCheck,
} from "react-icons/fa";

const getStatusBadge = (application) => {
  if (!application) {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        Available
      </span>
    );
  }

  switch (application.status) {
    case "Applied":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          <FaCheckCircle />
          Applied
        </span>
      );

    case "Shortlisted":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          <FaUserCheck />
          Shortlisted
        </span>
      );

    case "Interview Scheduled":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
          <FaClock />
          Interview
        </span>
      );

    case "Selected":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          <FaCheckCircle />
          Selected
        </span>
      );

    case "Rejected":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          <FaTimesCircle />
          Rejected
        </span>
      );

    default:
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
          {application.status}
        </span>
      );
  }
};

export default function ApplicantJobTable({
  jobs,
  applications,
  onView,
}) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow border p-16 text-center">

        <h2 className="text-2xl font-bold text-gray-700">
          No Jobs Found
        </h2>

        <p className="text-gray-500 mt-2">
          Try changing the search or filters.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr className="text-left">

            <th className="px-6 py-4 font-semibold">
              Job
            </th>

            <th className="px-6 py-4 font-semibold">
              Department
            </th>

            <th className="px-6 py-4 font-semibold">
              Type
            </th>

            <th className="px-6 py-4 font-semibold">
              Experience
            </th>

            <th className="px-6 py-4 font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => {

            const application =
              applications[job.id];

            return (
              <tr
                key={job.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-5">

                  <div>

                    <p className="font-semibold text-slate-800">
                      {job.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {job.description}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-5">
                  {job.department}
                </td>

                <td className="px-6 py-5">
                  {job.employment_type}
                </td>

                <td className="px-6 py-5">
                  {job.experience_required} Years
                </td>

                <td className="px-6 py-5">
                  {getStatusBadge(
                    application
                  )}
                </td>

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() =>
                      onView(job)
                    }
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaEye />

                    View

                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}
import {
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUserCheck,
} from "react-icons/fa";

const getStatusBadge = (status) => {
  switch (status) {
    case "Applied":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
          <FaCheckCircle />
          Applied
        </span>
      );

    case "Shortlisted":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
          <FaUserCheck />
          Shortlisted
        </span>
      );

    case "Interview Scheduled":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
          <FaClock />
          Interview
        </span>
      );

    case "Selected":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          <FaCheckCircle />
          Selected
        </span>
      );

    case "Rejected":
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
          <FaTimesCircle />
          Rejected
        </span>
      );

    default:
      return (
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
          {status}
        </span>
      );
  }
};

export default function MyApplicationsTable({
  applications,
  onView,
}) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow border p-16 text-center">

        <h2 className="text-2xl font-bold text-slate-700">
          No Applications Found
        </h2>

        <p className="text-gray-500 mt-3">
          You haven't applied for any jobs yet.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="text-left px-6 py-4 font-semibold">
              Job Title
            </th>

            <th className="text-left px-6 py-4 font-semibold">
              Applied On
            </th>

            <th className="text-left px-6 py-4 font-semibold">
              Status
            </th>

            <th className="text-center px-6 py-4 font-semibold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.map((application) => (

            <tr
              key={application.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-6 py-5">

                <div>

                  <p className="font-semibold text-slate-800">
                    {application.job_title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Job ID : {application.job_id}
                  </p>

                </div>

              </td>

              <td className="px-6 py-5">

                {new Date(
                  application.applied_at
                ).toLocaleDateString()}

              </td>

              <td className="px-6 py-5">

                {getStatusBadge(
                  application.status
                )}

              </td>

              <td className="px-6 py-5 text-center">

                <button
                  onClick={() =>
                    onView(application)
                  }
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >

                  <FaEye />

                  View

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
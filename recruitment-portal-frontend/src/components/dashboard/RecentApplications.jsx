const badge = {
  Applied:
    "bg-blue-100 text-blue-700",

  Shortlisted:
    "bg-yellow-100 text-yellow-700",

  "Interview Scheduled":
    "bg-purple-100 text-purple-700",

  Selected:
    "bg-green-100 text-green-700",

  Rejected:
    "bg-red-100 text-red-700",
};

export default function RecentApplications({
  applications,
}) {
  return (
    <div className="bg-white rounded-xl shadow border">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Recent Applications
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="text-left p-4">
              Job
            </th>

            <th className="text-left p-4">
              Applied
            </th>

            <th className="text-left p-4">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.map((app) => (

            <tr
              key={app.id}
              className="border-t"
            >

              <td className="p-4">
                {app.job_title}
              </td>

              <td className="p-4">
                {new Date(
                  app.applied_at
                ).toLocaleDateString()}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    badge[
                      app.status
                    ]
                  }`}
                >
                  {app.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
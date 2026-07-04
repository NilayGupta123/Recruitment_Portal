export default function NextActionCard({
  application,
}) {
  if (!application)
    return (
      <div className="bg-white rounded-xl shadow border p-6">
        No applications yet.
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow border p-6">

      <h2 className="text-xl font-bold mb-4">
        Next Action
      </h2>

      <div className="space-y-2">

        <p>

          <span className="font-semibold">
            Job:
          </span>{" "}
          {application.job_title}

        </p>

        <p>

          <span className="font-semibold">
            Status:
          </span>{" "}
          {application.status}

        </p>

        <p>

          <span className="font-semibold">
            Applied:
          </span>{" "}
          {new Date(
            application.applied_at
          ).toLocaleDateString()}

        </p>

      </div>

    </div>
  );
}
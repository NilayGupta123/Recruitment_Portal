import { useEffect, useState } from "react";

export default function ApplicantDetails({
  profile,
  onStatusUpdate,
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (profile) {
      setStatus(profile.status);
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow border h-full flex items-center justify-center text-gray-500">
        Select an applicant
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border h-full overflow-y-auto">
      <div className="p-6">

        <h2 className="text-xl font-bold mb-6">
          Applicant Details
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="font-semibold">
              {profile.user.full_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p>{profile.user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p>{profile.user.phone_number || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Current CTC</p>
            <p>{profile.details?.current_ctc ?? "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Expected CTC</p>
            <p>{profile.details?.expected_ctc ?? "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Experience</p>
            <p>{profile.details?.experience ?? "-"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-2">
              Status
            </p>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">
                Interview Scheduled
              </option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            onClick={() => onStatusUpdate(status)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
          >
            Update Status
          </button>

        </div>
      </div>
    </div>
  );
}
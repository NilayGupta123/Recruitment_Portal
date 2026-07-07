import { FaUserCircle } from "react-icons/fa";

export default function ApplicantList({
  applicants,
  selectedApplicant,
  onSelect,
}) {
  return (
    <div className="bg-white rounded-xl shadow border h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">
          Applicants
        </h2>
      </div>

      <div className="overflow-y-auto max-h-[650px]">
        {applicants.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No applicants found
          </div>
        ) : (
          applicants.map((applicant) => (
            <button
              key={applicant.application_id}
              onClick={() => onSelect(applicant)}
              className={`w-full text-left p-4 border-b hover:bg-blue-50 transition ${
                selectedApplicant?.application_id === applicant.application_id
                  ? "bg-blue-100 border-l-4 border-blue-600"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-2xl text-gray-500" />

                <div className="flex-1">
                  <div className="font-semibold">
                    {applicant.full_name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {applicant.email}
                  </div>

                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium
                    ${
                      applicant.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : applicant.status === "Shortlisted"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
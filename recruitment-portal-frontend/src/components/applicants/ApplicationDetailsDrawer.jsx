import {
  FaTimes,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaTimesCircle,
} from "react-icons/fa";

const steps = [
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
];

const statusColor = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  "Interview Scheduled":
    "bg-purple-100 text-purple-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const statusIcon = {
  Applied: <FaCheckCircle />,
  Shortlisted: <FaUserCheck />,
  "Interview Scheduled": <FaClock />,
  Selected: <FaCheckCircle />,
  Rejected: <FaTimesCircle />,
};

export default function ApplicationDetailsDrawer({
  application,
  onClose,
}) {
  if (!application) return null;

  const currentStep = steps.indexOf(
    application.status
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

      <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              {application.job_title}
            </h2>

            <p className="text-gray-500">
              Application Details
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

        <div className="p-6 space-y-8">

          {/* Summary */}

          <div className="grid grid-cols-2 gap-5">

            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3">

                <FaBriefcase className="text-blue-600" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Job
                  </p>

                  <h3 className="font-semibold">
                    {application.job_title}
                  </h3>

                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <div className="flex items-center gap-3">

                <FaCalendarAlt className="text-green-600" />

                <div>

                  <p className="text-gray-500 text-sm">
                    Applied On
                  </p>

                  <h3 className="font-semibold">
                    {new Date(
                      application.applied_at
                    ).toLocaleDateString()}
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Current Status */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              Current Status
            </h3>

            <span
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-full font-semibold ${
                statusColor[
                  application.status
                ]
              }`}
            >
              {statusIcon[
                application.status
              ]}

              {application.status}

            </span>

          </div>

          {/* Timeline */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Application Progress
            </h3>

            {application.status ===
            "Rejected" ? (

              <div className="border rounded-xl p-5 bg-red-50 border-red-200">

                <div className="flex items-center gap-3 text-red-700">

                  <FaTimesCircle size={22} />

                  <div>

                    <h4 className="font-bold">
                      Application Rejected
                    </h4>

                    <p className="text-sm">
                      Unfortunately your
                      application wasn't
                      selected.
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="space-y-5">

                {steps.map(
                  (step, index) => {
                    const completed =
                      index <= currentStep;

                    return (
                      <div
                        key={step}
                        className="flex items-center gap-5"
                      >

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            completed
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        >
                          {completed ? (
                            <FaCheckCircle />
                          ) : (
                            index + 1
                          )}
                        </div>

                        <div>

                          <h4
                            className={`font-semibold ${
                              completed
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {step}
                          </h4>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* Tips */}

          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">

            <h3 className="font-bold text-blue-700 mb-2">
              What's Next?
            </h3>

            {application.status ===
              "Applied" && (
              <p>
                Your application has
                been received. The HR
                team will review it
                shortly.
              </p>
            )}

            {application.status ===
              "Shortlisted" && (
              <p>
                Congratulations! Your
                profile has been
                shortlisted. Stay tuned
                for interview details.
              </p>
            )}

            {application.status ===
              "Interview Scheduled" && (
              <p>
                Check your email
                regularly for interview
                instructions and timing.
              </p>
            )}

            {application.status ===
              "Selected" && (
              <p>
                Congratulations! 🎉 You
                have been selected.
                Expect further
                communication from HR.
              </p>
            )}

            {application.status ===
              "Rejected" && (
              <p>
                Don't be discouraged.
                Continue applying for
                other opportunities.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
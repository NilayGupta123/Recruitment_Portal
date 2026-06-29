import { FaBriefcase } from "react-icons/fa";

export default function JobList({
  jobs,
  selectedJob,
  onSelect,
}) {

  return (

    <div className="bg-white rounded-xl shadow border h-full">

      <div className="p-4 border-b">

        <h2 className="font-bold text-lg">

          Jobs

        </h2>

      </div>

      <div className="overflow-y-auto max-h-[650px]">

        {jobs.map((job) => (

          <button

            key={job.id}

            onClick={() => onSelect(job)}

            className={`w-full text-left px-4 py-3 border-b hover:bg-blue-50 transition

            ${
              selectedJob?.id === job.id
                ? "bg-blue-100 border-l-4 border-blue-600"
                : ""
            }`}

          >

            <div className="flex items-center gap-3">

              <FaBriefcase className="text-green-600" />

              <div>

                <div className="font-semibold">

                  {job.title}

                </div>

                <div className="text-xs text-gray-500">

                  {job.department}

                </div>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>

  );

}
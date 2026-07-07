import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../../api/jobsApi";

export default function JobMultiSelect({
  selectedJobs,
  setSelectedJobs,
}) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await getJobs();

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJob = (job) => {
    const exists = selectedJobs.some(
      (j) => j.job_id === job.id
    );

    if (exists) {
      setSelectedJobs(
        selectedJobs.filter(
          (j) => j.job_id !== job.id
        )
      );
    } else {
      setSelectedJobs([
        ...selectedJobs,
        {
          job_id: job.id,
        },
      ]);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const value = search.toLowerCase();

      return (
        job.title?.toLowerCase().includes(value) ||
        job.department?.toLowerCase().includes(value)
      );
    });
  }, [jobs, search]);

  return (
    <div className="space-y-4">

      {/* Header */}

      <div className="flex justify-between items-center">

        <label className="text-lg font-semibold">
          Jobs
        </label>

        <span className="text-sm text-blue-600 font-medium">
          {selectedJobs.length} Selected
        </span>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      {/* List */}

      <div className="border rounded-xl max-h-80 overflow-y-auto">

        {loading ? (

          <div className="p-8 text-center text-gray-500">
            Loading jobs...
          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No jobs found.
          </div>

        ) : (

          filteredJobs.map((job) => {

            const checked = selectedJobs.some(
              (j) => j.job_id === job.id
            );

            return (

              <label
                key={job.id}
                className={`flex items-start gap-4 p-4 cursor-pointer border-b last:border-b-0 hover:bg-slate-50 transition ${
                  checked
                    ? "bg-blue-50"
                    : ""
                }`}
              >

                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    toggleJob(job)
                  }
                  className="mt-1"
                />

                <div className="flex-1">

                  <div className="font-semibold text-slate-800">
                    {job.title}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">

                    {job.department || "No Department"}

                    {" • "}

                    {job.employment_type ||
                      "N/A"}

                    {" • "}

                    {job.experience_required ??
                      0}{" "}
                    Years

                  </div>

                </div>

              </label>

            );
          })

        )}

      </div>

    </div>
  );
}
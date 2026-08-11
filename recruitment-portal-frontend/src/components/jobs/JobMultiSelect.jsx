import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../../api/jobsApi";
import { Input, Label } from "../ui/Input";

export default function JobMultiSelect({ selectedJobs, setSelectedJobs }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobs({ page: 1, page_size: 200 });
      setJobs(response.data?.items || response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJob = (job) => {
    const exists = selectedJobs.some((j) => j.job_id === job.id);

    if (exists) {
      setSelectedJobs(selectedJobs.filter((j) => j.job_id !== job.id));
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
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="mb-0">Jobs</Label>
        <span className="text-sm font-semibold text-[var(--color-brand)]">
          {selectedJobs.length} selected
        </span>
      </div>

      <Input
        type="text"
        placeholder="Search jobs…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="custom-scrollbar max-h-80 overflow-y-auto rounded-[16px] border border-[var(--color-line)]">
        {loading ? (
          <div className="p-8 text-center text-sm text-[var(--color-ink-secondary)]">
            Loading jobs…
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--color-ink-secondary)]">
            No jobs found.
          </div>
        ) : (
          filteredJobs.map((job) => {
            const checked = selectedJobs.some((j) => j.job_id === job.id);
            return (
              <label
                key={job.id}
                className={`flex cursor-pointer items-start gap-3 border-b border-[var(--color-line)] px-4 py-3.5 last:border-b-0 transition ${
                  checked
                    ? "bg-[var(--color-brand-soft)]"
                    : "hover:bg-[var(--color-canvas)]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleJob(job)}
                  className="mt-1 h-4 w-4 accent-[var(--color-brand)]"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[var(--color-ink)]">
                    {job.title}
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                    {job.department || "No department"} •{" "}
                    {job.employment_type || "N/A"} •{" "}
                    {job.experience_required ?? 0} years
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

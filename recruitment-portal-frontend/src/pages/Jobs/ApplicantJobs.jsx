import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getJobs } from "../../api/jobsApi";
import { getMyApplications } from "../../api/applicantApi";

import ApplicantJobTable from "../../components/jobs/ApplicantJobTable";
import ApplicantJobDrawer from "../../components/jobs/ApplicantJobDrawer";
import PageHeader from "../../components/ui/PageHeader";
import { Input, Select } from "../../components/ui/Input";
import LoadingState from "../../components/ui/LoadingState";

export default function ApplicantJobs() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsRes, appsRes] = await Promise.all([
        getJobs(),
        getMyApplications(),
      ]);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const applicationMap = useMemo(() => {
    const map = {};
    applications.forEach((app) => {
      map[app.job_id] = app;
    });
    return map;
  }, [applications]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        (job.description || "").toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = !department || job.department === department;
      const matchesType =
        !employmentType || job.employment_type === employmentType;
      return matchesSearch && matchesDepartment && matchesType;
    });
  }, [jobs, search, department, employmentType]);

  const departments = [
    ...new Set(jobs.map((j) => j.department).filter(Boolean)),
  ];

  const employmentTypes = [
    ...new Set(jobs.map((j) => j.employment_type).filter(Boolean)),
  ];

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Available jobs"
          description="Browse roles and apply in one place."
        />

        <div className="flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-white/80 p-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Input
            type="text"
            placeholder="Search jobs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="sm:max-w-[200px]"
          >
            <option value="">All departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          <Select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="sm:max-w-[200px]"
          >
            <option value="">All types</option>
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        {loading ? (
          <LoadingState label="Loading jobs…" rows={6} />
        ) : (
          <ApplicantJobTable
            jobs={filteredJobs}
            applications={applicationMap}
            onView={setSelectedJob}
          />
        )}
      </div>

      <ApplicantJobDrawer
        job={selectedJob}
        application={selectedJob ? applicationMap[selectedJob.id] : null}
        onClose={() => setSelectedJob(null)}
        onApplied={loadData}
      />
    </>
  );
}

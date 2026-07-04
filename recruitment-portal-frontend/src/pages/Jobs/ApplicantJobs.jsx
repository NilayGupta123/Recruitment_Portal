import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getJobs } from "../../api/jobsApi";
import {
  getMyApplications,
} from "../../api/applicantApi";

import ApplicantJobTable from "../../components/jobs/ApplicantJobTable";
import ApplicantJobDrawer from "../../components/jobs/ApplicantJobDrawer";

export default function ApplicantJobs() {
  const [jobs, setJobs] = useState([]);

  const [applications, setApplications] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [employmentType, setEmploymentType] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [jobsRes, appsRes] =
        await Promise.all([
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
        job.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (job.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        !department ||
        job.department === department;

      const matchesType =
        !employmentType ||
        job.employment_type ===
          employmentType;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesType
      );
    });
  }, [
    jobs,
    search,
    department,
    employmentType,
  ]);

  const departments = [
    ...new Set(
      jobs
        .map((j) => j.department)
        .filter(Boolean)
    ),
  ];

  const employmentTypes = [
    ...new Set(
      jobs
        .map((j) => j.employment_type)
        .filter(Boolean)
    ),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Available Jobs
          </h1>

          <p className="text-gray-500 mt-1">
            Browse jobs and apply.
          </p>

        </div>

        {/* Search & Filters */}

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">
              All Departments
            </option>

            {departments.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>

          <select
            value={employmentType}
            onChange={(e) =>
              setEmploymentType(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">
              All Types
            </option>

            {employmentTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>

        </div>

        {/* Table */}

        <ApplicantJobTable
          jobs={filteredJobs}
          applications={applicationMap}
          onView={setSelectedJob}
        />

      </div>

      {/* Drawer */}

      <ApplicantJobDrawer
        job={selectedJob}
        application={
          selectedJob
            ? applicationMap[selectedJob.id]
            : null
        }
        onClose={() =>
          setSelectedJob(null)
        }
        onApplied={loadData}
      />
    </>
  );
}
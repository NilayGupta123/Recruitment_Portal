import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobDrawer from "../../components/drawers/JobDrawer";
import CreateJobDrawer from "../../components/drawers/CreateJobDrawer";
import EditJobDrawer from "../../components/drawers/EditJobDrawer";
import { createJob, updateJob,getJobs } from "../../api/jobsApi";


export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("");

  const [selectedJob, setSelectedJob] =
    useState(null);
  
  const [showCreateDrawer, setShowCreateDrawer] =
    useState(false);

  const [showEditDrawer, setShowEditDrawer] =
    useState(false);

  const [editingJob, setEditingJob] =
    useState(null);
  
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await getJobs();

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const departments = [
    ...new Set(
      jobs
        .map((job) => job.department)
        .filter(Boolean)
    ),
  ];

  const employmentTypes = [
    ...new Set(
      jobs
        .map((job) => job.employment_type)
        .filter(Boolean)
    ),
  ];

  const handleCreateJob = async (data) => {
    console.log("JOB PAYLOAD:", data);

    try {
      setCreating(true);

      const response = await createJob(data);

      console.log("API RESPONSE:", response.data);

      toast.success("Job created successfully");

      await loadJobs();

      setShowCreateDrawer(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create job");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateJob = async (jobId, data) => {
    try {
      setUpdating(true);

      await updateJob(jobId, data);

      toast.success("Job updated successfully");

      await loadJobs();

      setShowEditDrawer(false);

      setEditingJob(null);

      setSelectedJob(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update job");
    } finally {
      setUpdating(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      !departmentFilter ||
      job.department === departmentFilter;

    const matchesType =
      !typeFilter ||
      job.employment_type === typeFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesType
    );
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <h1 className="text-4xl font-bold text-slate-800">
            Jobs
          </h1>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-slate-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(
                  e.target.value
                )
              }
              className="border border-slate-200 rounded-xl px-4 py-2 bg-white"
            >
              <option value="">
                All Departments
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                )
              )}
            </select>

            {/* Employment Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
              className="border border-slate-200 rounded-xl px-4 py-2 bg-white"
            >
              <option value="">
                All Types
              </option>

              {employmentTypes.map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                )
              )}
            </select>

            {/* Create Job Button */}
            <button onClick={() => setShowCreateDrawer(true)} className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
              + Create Job
            </button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left p-4 font-semibold">
                  Title
                </th>

                <th className="text-left p-4 font-semibold">
                  Department
                </th>

                <th className="text-left p-4 font-semibold">
                  Type
                </th>

                <th className="text-left p-4 font-semibold">
                  Experience
                </th>

                <th className="text-left p-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No jobs found
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {job.title}
                    </td>

                    <td className="p-4">
                      {job.department}
                    </td>

                    <td className="p-4">
                      {job.employment_type}
                    </td>

                    <td className="p-4">
                      {
                        job.experience_required
                      }{" "}
                      Years
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          setSelectedJob(job)
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <JobDrawer
        job={selectedJob}
        onClose={() =>
          setSelectedJob(null)
        }
        onEdit={(job) => {
          setEditingJob(job);
          setShowEditDrawer(true);
        }}
      />
      <CreateJobDrawer
        isOpen={showCreateDrawer}
        onClose={() =>
          setShowCreateDrawer(false)
        }
        onSubmit={handleCreateJob}
      />
      <EditJobDrawer
        isOpen={showEditDrawer}
        onClose={() => {
          setShowEditDrawer(false);
          setEditingJob(null);
        }}
        onSubmit={handleUpdateJob}
        job={editingJob}
      />
    </>
  );
}
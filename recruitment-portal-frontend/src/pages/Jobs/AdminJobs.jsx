import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import JobDrawer from "../../components/drawers/JobDrawer";
import CreateJobDrawer from "../../components/drawers/CreateJobDrawer";
import EditJobDrawer from "../../components/drawers/EditJobDrawer";
import { createJob, updateJob, getJobs, deleteJob } from "../../api/jobsApi";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import { Input, Select } from "../../components/ui/Input";
import Pagination from "../../components/ui/Pagination";
import {
  TableShell,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
} from "../../components/ui/Table";
import { TableLoadingRow } from "../../components/ui/LoadingState";

const PAGE_SIZE = 10;

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    departments: [],
    employmentTypes: [],
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, departmentFilter, typeFilter]);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getJobs({
        page,
        page_size: PAGE_SIZE,
        q: debouncedSearch || undefined,
        department: departmentFilter || undefined,
        employment_type: typeFilter || undefined,
      });
      const data = response.data || {};
      setJobs(data.items || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, departmentFilter, typeFilter]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getJobs({ page: 1, page_size: 200 });
        const items = response.data?.items || [];
        setFilterOptions({
          departments: [
            ...new Set(items.map((job) => job.department).filter(Boolean)),
          ].sort(),
          employmentTypes: [
            ...new Set(items.map((job) => job.employment_type).filter(Boolean)),
          ].sort(),
        });
      } catch {
        /* non-blocking */
      }
    })();
  }, []);

  const handleCreateJob = async (data) => {
    try {
      setCreating(true);
      await createJob(data);
      toast.success("Job created successfully");
      setPage(1);
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

  const handleDeleteJob = async (job) => {
    await deleteJob(job.id);
    toast.success("Job deleted successfully");
    setSelectedJob(null);
    if (jobs.length === 1 && page > 1) {
      setPage((p) => p - 1);
    } else {
      await loadJobs();
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Jobs"
          description="Create, refine, and publish open roles."
          actions={
            <Button onClick={() => setShowCreateDrawer(true)}>
              <Plus size={18} />
              Create job
            </Button>
          }
        />

        <div className="flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Input
            type="text"
            placeholder="Search jobs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="sm:max-w-[200px]"
          >
            <option value="">All departments</option>
            {filterOptions.departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="sm:max-w-[180px]"
          >
            <option value="">All types</option>
            {filterOptions.employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        <TableShell
          footer={
            <Pagination
              page={page}
              pages={pages}
              total={total}
              pageSize={PAGE_SIZE}
              onChange={setPage}
              disabled={loading}
            />
          }
        >
          <Table>
            <THead>
              <tr>
                <Th>Title</Th>
                <Th>Department</Th>
                <Th>Type</Th>
                <Th>Experience</Th>
              </tr>
            </THead>
            <TBody>
              {loading ? (
                <TableLoadingRow colSpan={4} label="Loading jobs…" />
              ) : jobs.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={4}
                    className="py-12 text-center text-[var(--color-ink-secondary)]"
                  >
                    No jobs found
                  </Td>
                </Tr>
              ) : (
                jobs.map((job) => (
                  <Tr key={job.id} onClick={() => setSelectedJob(job)}>
                    <Td className="font-semibold">{job.title}</Td>
                    <Td className="text-[var(--color-ink-secondary)]">
                      {job.department}
                    </Td>
                    <Td className="text-[var(--color-ink-secondary)]">
                      {job.employment_type}
                    </Td>
                    <Td className="text-[var(--color-ink-secondary)]">
                      {job.experience_required != null
                        ? `${job.experience_required} years`
                        : "—"}
                    </Td>
                  </Tr>
                ))
              )}
            </TBody>
          </Table>
        </TableShell>
      </div>

      <JobDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onEdit={(job) => {
          setEditingJob(job);
          setShowEditDrawer(true);
        }}
        onDelete={handleDeleteJob}
      />
      <CreateJobDrawer
        isOpen={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        onSubmit={handleCreateJob}
        loading={creating}
      />
      <EditJobDrawer
        isOpen={showEditDrawer}
        onClose={() => {
          setShowEditDrawer(false);
          setEditingJob(null);
        }}
        onSubmit={handleUpdateJob}
        job={editingJob}
        loading={updating}
      />
    </>
  );
}

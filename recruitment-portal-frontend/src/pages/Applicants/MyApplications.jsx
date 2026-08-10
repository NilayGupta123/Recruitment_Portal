import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getMyApplications } from "../../api/applicantApi";

import MyApplicationsTable from "../../components/applicants/MyApplicationsTable";
import ApplicationDetailsDrawer from "../../components/applicants/ApplicationDetailsDrawer";
import PageHeader from "../../components/ui/PageHeader";
import { Input, Select } from "../../components/ui/Input";
import LoadingState from "../../components/ui/LoadingState";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await getMyApplications();
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = app.job_title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = !status || app.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, status]);

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="My applications"
          description="Track your job applications."
        />

        <div className="flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-white/80 p-3 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="sm:max-w-[220px]"
            disabled={loading}
          >
            <option value="">All status</option>
            <option>Applied</option>
            <option>Shortlisted</option>
            <option>Interview Scheduled</option>
            <option>Selected</option>
            <option>Rejected</option>
          </Select>
        </div>

        {loading ? (
          <LoadingState label="Loading applications…" rows={5} />
        ) : (
          <MyApplicationsTable
            applications={filteredApplications}
            onView={setSelectedApplication}
          />
        )}
      </div>

      <ApplicationDetailsDrawer
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
}

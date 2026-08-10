import { useEffect, useState } from "react";
import ApplicantStats from "../../components/dashboard/ApplicantStats";
import NextActionCard from "../../components/dashboard/NextActionCard";
import RecentApplications from "../../components/dashboard/RecentApplications";
import { getMyApplications } from "../../api/applicantApi";
import PageHeader from "../../components/ui/PageHeader";

export default function ApplicantDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await getMyApplications();
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const stats = {
    applied: applications.length,
    shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
    interview: applications.filter((a) => a.status === "Interview Scheduled")
      .length,
    selected: applications.filter((a) => a.status === "Selected").length,
  };

  const nextApplication =
    applications.find((a) => a.status === "Interview Scheduled") ||
    applications[0];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Dashboard"
        description="Track your applications and see what needs attention next."
      />
      <ApplicantStats stats={stats} />
      <NextActionCard application={nextApplication} />
      <RecentApplications applications={applications.slice(0, 5)} />
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  getJobs,
  getCampaigns,
  getApplicants,
} from "../../api/dashboardApi";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [jobsResponse, campaignsResponse, applicantsResponse] =
        await Promise.all([getJobs(), getCampaigns(), getApplicants()]);

      setJobs(jobsResponse.data);
      setCampaigns(campaignsResponse.data);
      setApplicants(applicantsResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const publishedCampaigns = campaigns.filter(
    (campaign) => campaign.status === "PUBLISHED"
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg font-medium text-slate-500 animate-pulse">
          Loading Dashboard Data...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Recruitment Dashboard
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total Open Jobs" value={jobs.length} />
        <StatCard title="Total Campaigns" value={campaigns.length} />
        <StatCard title="Total Applicants" value={applicants.length} />
        <StatCard title="Published Campaigns" value={publishedCampaigns} />
      </div>

      {/* Row 2: Applications & Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="flex flex-col">
          <h2 className="text-base font-semibold leading-6 text-slate-900 mb-4">
            Recent Applications
          </h2>
          <div className="overflow-hidden shadow-sm ring-1 ring-slate-200 rounded-xl bg-white flex-1">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                    Applicant ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Job ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {applicants.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                      #{item.applicant_id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                      #{item.job_id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
                {applicants.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-sm text-slate-500">No recent applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Open Jobs */}
        <div className="flex flex-col">
          <h2 className="text-base font-semibold leading-6 text-slate-900 mb-4">
            Open Jobs
          </h2>
          <div className="overflow-hidden shadow-sm ring-1 ring-slate-200 rounded-xl bg-white flex-1">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {jobs.slice(0, 5).map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                      {job.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                      {job.department}
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan="2" className="py-8 text-center text-sm text-slate-500">No open jobs available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Campaigns */}
      <div className="flex flex-col">
        <h2 className="text-base font-semibold leading-6 text-slate-900 mb-4">
          Upcoming Campaigns
        </h2>
        <div className="overflow-hidden shadow-sm ring-1 ring-slate-200 rounded-xl bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                  Campaign Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  Start Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {campaigns.slice(0, 5).map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                    {campaign.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <CampaignStatusBadge status={campaign.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                    {campaign.start_date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                    {campaign.end_date}
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-sm text-slate-500">No campaigns scheduled.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6 flex flex-col justify-center">
      <p className="text-sm font-medium text-slate-500 truncate">
        {title}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Shortlisted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  };

  const defaultStyle = "bg-slate-50 text-slate-600 ring-slate-500/10";

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        styles[status] || defaultStyle
      }`}
    >
      {status}
    </span>
  );
}

function CampaignStatusBadge({ status }) {
  const styles = {
    PUBLISHED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    DRAFT: "bg-amber-50 text-amber-700 ring-amber-600/20",
    CLOSED: "bg-slate-50 text-slate-600 ring-slate-500/10",
  };

  const defaultStyle = "bg-slate-50 text-slate-600 ring-slate-500/10";

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        styles[status] || defaultStyle
      }`}
    >
      {status}
    </span>
  );
}
import { useEffect, useState } from "react";
import { Briefcase, Megaphone, Users, Rocket } from "lucide-react";
import { getJobs, getCampaigns, getApplicants } from "../../api/dashboardApi";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Badge from "../../components/ui/Badge";
import {
  TableShell,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
} from "../../components/ui/Table";
import LoadingState from "../../components/ui/LoadingState";

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
      setJobs(jobsResponse.data?.items || jobsResponse.data || []);
      setCampaigns(
        campaignsResponse.data?.items || campaignsResponse.data || []
      );
      setApplicants(applicantsResponse.data || []);
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
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="A clear snapshot of open roles, campaigns, and incoming talent."
        />
        <LoadingState label="Loading dashboard…" rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="A clear snapshot of open roles, campaigns, and incoming talent."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Open jobs"
          value={jobs.length}
          icon={<Briefcase size={20} />}
        />
        <StatCard
          title="Campaigns"
          value={campaigns.length}
          icon={<Megaphone size={20} />}
        />
        <StatCard
          title="Applicants"
          value={applicants.length}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Published campaigns"
          value={publishedCampaigns}
          icon={<Rocket size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Recent applications
          </h2>
          <TableShell>
            <Table>
              <THead>
                <tr>
                  <Th>Applicant</Th>
                  <Th>Job</Th>
                  <Th>Status</Th>
                </tr>
              </THead>
              <TBody>
                {applicants.slice(0, 5).map((item) => (
                  <Tr key={item.id}>
                    <Td className="font-semibold">#{item.applicant_id}</Td>
                    <Td className="text-[var(--color-ink-secondary)]">
                      #{item.job_id}
                    </Td>
                    <Td>
                      <Badge status={item.status}>{item.status}</Badge>
                    </Td>
                  </Tr>
                ))}
                {applicants.length === 0 && (
                  <Tr>
                    <Td colSpan={3} className="py-10 text-center text-[var(--color-ink-secondary)]">
                      No recent applications.
                    </Td>
                  </Tr>
                )}
              </TBody>
            </Table>
          </TableShell>
        </section>

        <section className="space-y-3">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
            Open jobs
          </h2>
          <TableShell>
            <Table>
              <THead>
                <tr>
                  <Th>Title</Th>
                  <Th>Department</Th>
                </tr>
              </THead>
              <TBody>
                {jobs.slice(0, 5).map((job) => (
                  <Tr key={job.id}>
                    <Td className="font-semibold">{job.title}</Td>
                    <Td className="text-[var(--color-ink-secondary)]">
                      {job.department}
                    </Td>
                  </Tr>
                ))}
                {jobs.length === 0 && (
                  <Tr>
                    <Td colSpan={2} className="py-10 text-center text-[var(--color-ink-secondary)]">
                      No open jobs.
                    </Td>
                  </Tr>
                )}
              </TBody>
            </Table>
          </TableShell>
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
          Campaigns
        </h2>
        <TableShell>
          <Table>
            <THead>
              <tr>
                <Th>Campaign</Th>
                <Th>Status</Th>
                <Th>Start</Th>
                <Th>End</Th>
              </tr>
            </THead>
            <TBody>
              {campaigns.slice(0, 5).map((campaign) => (
                <Tr key={campaign.id}>
                  <Td className="font-semibold">{campaign.title}</Td>
                  <Td>
                    <Badge status={campaign.status}>{campaign.status}</Badge>
                  </Td>
                  <Td className="text-[var(--color-ink-secondary)]">
                    {campaign.start_date}
                  </Td>
                  <Td className="text-[var(--color-ink-secondary)]">
                    {campaign.end_date}
                  </Td>
                </Tr>
              ))}
              {campaigns.length === 0 && (
                <Tr>
                  <Td colSpan={4} className="py-10 text-center text-[var(--color-ink-secondary)]">
                    No campaigns scheduled.
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
        </TableShell>
      </section>
    </div>
  );
}

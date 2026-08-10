import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getCampaigns } from "../../api/campaignsApi";
import { getCampaignJobs } from "../../api/campaignJobApi";
import {
  getApplicantsByJob,
  getApplicantProfile,
  updateApplicantStatus,
} from "../../api/applicantApi";

import CampaignList from "../../components/applicants/CampaignList";
import JobList from "../../components/applicants/JobList";
import ApplicantList from "../../components/applicants/ApplicantList";
import ApplicantDetails from "../../components/applicants/ApplicantDetails";
import PageHeader from "../../components/ui/PageHeader";
import LoadingState from "../../components/ui/LoadingState";

export default function Applicants() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response = await getCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignSelect = async (campaign) => {
    setSelectedCampaign(campaign);
    setSelectedJob(null);
    setSelectedApplicant(null);
    setProfile(null);
    setApplicants([]);

    try {
      const response = await getCampaignJobs(campaign.id);
      setJobs(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load jobs");
    }
  };

  const handleJobSelect = async (job) => {
    setSelectedJob(job);
    setSelectedApplicant(null);
    setProfile(null);

    try {
      const response = await getApplicantsByJob(job.id);
      setApplicants(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applicants");
    }
  };

  const handleApplicantSelect = async (application) => {
    setSelectedApplicant(application);

    try {
      const response = await getApplicantProfile(application.application_id);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applicant profile");
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await updateApplicantStatus(selectedApplicant.application_id, {
        status,
      });

      toast.success("Status updated");

      const response = await getApplicantProfile(
        selectedApplicant.application_id
      );
      setProfile(response.data);

      if (selectedJob) {
        const applicantsResponse = await getApplicantsByJob(selectedJob.id);
        setApplicants(applicantsResponse.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applicants"
        description="Browse campaigns, jobs, and applicants."
      />

      {loading ? (
        <LoadingState label="Loading applicants workspace…" rows={8} />
      ) : (
        <div className="grid h-[75vh] grid-cols-12 gap-4">
          <div className="col-span-3 min-h-0">
            <CampaignList
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              onSelect={handleCampaignSelect}
            />
          </div>
          <div className="col-span-3 min-h-0">
            <JobList
              jobs={jobs}
              selectedJob={selectedJob}
              onSelect={handleJobSelect}
            />
          </div>
          <div className="col-span-3 min-h-0">
            <ApplicantList
              applicants={applicants}
              selectedApplicant={selectedApplicant}
              onSelect={handleApplicantSelect}
            />
          </div>
          <div className="col-span-3 min-h-0">
            <ApplicantDetails
              profile={profile}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

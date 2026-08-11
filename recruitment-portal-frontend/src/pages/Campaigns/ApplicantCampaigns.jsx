import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getPublicCampaigns,
  getCampaignJobs,
  getMyApplications,
} from "../../api/campaignsApi";

import ApplicantCampaignCard from "../../components/campaigns/ApplicantCampaignCard";
import ApplicantCampaignDrawer from "../../components/campaigns/ApplicantCampaignDrawer";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingState from "../../components/ui/LoadingState";

export default function ApplicantCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignJobs, setCampaignJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const [campaignsRes, applicationsRes] = await Promise.all([
        getPublicCampaigns(),
        getMyApplications(),
      ]);
      setCampaigns(campaignsRes.data);
      setApplications(applicationsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  const applicationMap = {};
  applications.forEach((app) => {
    applicationMap[app.mapping_id] = app;
  });

  const openCampaign = async (campaign) => {
    try {
      const res = await getCampaignJobs(campaign.id);
      setCampaignJobs(res.data);
      setSelectedCampaign(campaign);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load jobs.");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Recruitment campaigns"
          description="Explore active hiring campaigns."
        />

        {loading ? (
          <LoadingState label="Loading campaigns…" rows={4} />
        ) : campaigns.length === 0 ? (
          <EmptyState
            title="No campaigns yet"
            description="Check back soon for new hiring campaigns."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {campaigns.map((campaign) => (
              <ApplicantCampaignCard
                key={campaign.id}
                campaign={campaign}
                onOpen={() => openCampaign(campaign)}
              />
            ))}
          </div>
        )}
      </div>

      <ApplicantCampaignDrawer
        campaign={selectedCampaign}
        jobs={campaignJobs}
        applications={applicationMap}
        onClose={() => setSelectedCampaign(null)}
      />
    </>
  );
}

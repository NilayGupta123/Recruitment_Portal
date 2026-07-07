import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getPublicCampaigns,
  getCampaignJobs,
  getMyApplications,
} from "../../api/campaignsApi";

import ApplicantCampaignCard from "../../components/campaigns/ApplicantCampaignCard";
import ApplicantCampaignDrawer from "../../components/campaigns/ApplicantCampaignDrawer";

export default function ApplicantCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  const [selectedCampaign, setSelectedCampaign] =
    useState(null);

  const [campaignJobs, setCampaignJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const [
        campaignsRes,
        applicationsRes,
      ] = await Promise.all([
        getPublicCampaigns(),
        getMyApplications(),
      ]);

      setCampaigns(campaignsRes.data);

      setApplications(
        applicationsRes.data
      );
    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to load campaigns."
      );
    } finally {
      setLoading(false);
    }
  };

  const applicationMap = {};

  applications.forEach((app) => {
    applicationMap[app.job_id] = app;
  });

  const openCampaign = async (campaign) => {
    try {
      const res = await getCampaignJobs(
        campaign.id
      );

      setCampaignJobs(res.data);

      setSelectedCampaign(campaign);
    } catch (err) {
      console.error(err);

      toast.error(
        "Unable to load jobs."
      );
    }
  };

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

        <div>

          <h1 className="text-3xl font-bold">
            Recruitment Campaigns
          </h1>

          <p className="text-gray-500">
            Explore active hiring campaigns.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {campaigns.map((campaign) => (

            <ApplicantCampaignCard
              key={campaign.id}
              campaign={campaign}
              onOpen={() =>
                openCampaign(campaign)
              }
            />

          ))}

        </div>

      </div>

      <ApplicantCampaignDrawer
          campaign={selectedCampaign}
          jobs={campaignJobs}
          applications={applicationMap}
          onClose={() =>
            setSelectedCampaign(null)
          }
      />

    </>
  );
}
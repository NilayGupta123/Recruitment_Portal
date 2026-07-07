import API from "./axios";

export const getCampaignJobs = (campaignId) =>
  API.get(`/campaigns/${campaignId}/jobs`);

export const updateCampaignJobs = (campaignId, jobs) =>
  API.put(`/campaigns/${campaignId}/jobs`, {
    jobs,
  });
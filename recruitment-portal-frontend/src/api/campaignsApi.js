import API from "./axios";

export const getCampaigns = (params = {}) =>
  API.get("/campaigns/list", { params });

export const createCampaign = (data) =>
  API.post("/campaigns/create", data);

export const updateCampaign = (campaignId, data) =>
  API.put(`/campaigns/put/${campaignId}`, data);

export const deleteCampaign = (campaignId) =>
  API.delete(`/campaigns/delete/${campaignId}`);

export const getCampaignJobs = (campaignId) =>
  API.get(`/campaigns/${campaignId}/jobs`);

export const getMyApplications = () =>
  API.get("/applicants/my");

export const getPublicCampaigns = () =>
  API.get("/public/campaigns");

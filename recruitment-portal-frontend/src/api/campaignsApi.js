import API from "./axios";

export const getCampaigns = () =>
  API.get("/campaigns/list");

export const createCampaign = (data) =>
  API.post("/campaigns/create", data);

export const updateCampaign = (
  campaignId,
  data
) =>
  API.put(
    `/campaigns/put/${campaignId}`,
    data
  );
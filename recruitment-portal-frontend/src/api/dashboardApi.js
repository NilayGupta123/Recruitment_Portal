import API from "./axios";

export const getJobs = (params = { page: 1, page_size: 200 }) =>
  API.get("/jobs/list", { params });

export const getCampaigns = (params = { page: 1, page_size: 200 }) =>
  API.get("/campaigns/list", { params });

export const getApplicants = () =>
  API.get("/applicants/list");

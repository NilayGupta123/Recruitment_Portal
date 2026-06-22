import API from "./axios";

export const getJobs = () =>
  API.get("/jobs/list");

export const getCampaigns = () =>
  API.get("/campaigns/list");

export const getApplicants = () =>
  API.get("/applicants/list");
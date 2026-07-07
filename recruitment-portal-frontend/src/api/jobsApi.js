import API from "./axios";

export const getJobs = () =>
  API.get("/jobs/list");
export const createJob = (data) =>
  API.post("/jobs/create", data);
export const updateJob = (jobId,data) =>
  API.put(`/jobs/put/${jobId}`, data);
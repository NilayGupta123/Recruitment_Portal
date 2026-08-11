import API from "./axios";

export const getJobs = (params = {}) =>
  API.get("/jobs/list", { params });

export const createJob = (data) =>
  API.post("/jobs/create", data);

export const updateJob = (jobId, data) =>
  API.put(`/jobs/put/${jobId}`, data);

export const deleteJob = (jobId) =>
  API.delete(`/jobs/delete/${jobId}`);

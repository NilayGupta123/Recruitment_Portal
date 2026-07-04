import API from "./axios";

export const getPublicJobs = () =>
    API.get("/jobs/public");

export const getPublicJob = (id) =>
    API.get(`/jobs/public/${id}`);
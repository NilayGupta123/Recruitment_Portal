import API from "./axios";

export const getApplicantsByJob = (jobId) =>
  API.get(`/jobs/${jobId}/applicants`);

export const getApplicantProfile = (applicationId) =>
  API.get(`/applicants/profile/${applicationId}`);

export const updateApplicantStatus = (
  applicationId,
  data
) =>
  API.patch(
    `/applicants/patch/${applicationId}`,
    data
  );

export const getMyApplications = () =>
  API.get("/applicants/my");

export const applyForJob = (data) =>
  API.post(
    "/applicants/applicant-register",
    data
  );

export const getMyProfile = () =>
  API.get("/auth/me");

export const applyToJob = (jobId) =>
  API.post(`/applicants/apply/${jobId}`);
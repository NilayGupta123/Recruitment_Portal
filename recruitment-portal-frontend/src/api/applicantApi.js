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
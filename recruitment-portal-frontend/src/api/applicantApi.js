import API from "./axios";

export const getCampaignJobApplicants = (campaignId, jobId) =>
  API.get(`/campaigns/${campaignId}/jobs/${jobId}/applicants`);

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

export const applyToJob = (mappingId, file) => {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  return API.post(`/applicants/apply/${mappingId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
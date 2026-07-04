import API from "./axios";

export const getMyApplicantDetail = () =>
  API.get("/applicant-details/me");

export const updateMyApplicantDetail = (
  data
) =>
  API.put(
    "/applicant-details/me",
    data
  );
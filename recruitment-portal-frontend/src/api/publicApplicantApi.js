import API from "./axios";

export const checkApplicant = (email) =>
  API.post("/public/check-applicant", {
    email,
  });

export const uploadResume = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return API.post("/public/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const applyJob = (payload) =>
  API.post("/public/apply", payload);
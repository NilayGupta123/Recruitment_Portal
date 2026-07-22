import API from "./axios";

export const generateDescription = (payload) =>
  API.post(
    "/ai/generate-description",
    payload
  );
import API from "./axios";

export const generateDescription = (payload) =>
  API.post(
    "/ai/generate-description",
    payload
  );

export const generateScreeningQuestions = (data) =>
    API.post(
        "/ai/generate-screening-questions",
        data
    );
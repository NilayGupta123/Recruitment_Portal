import API from "./axios";

export const getPublicPostings = () =>
    API.get("/public/postings");

export const getPublicPosting = (mappingId) =>
    API.get(`/public/postings/${mappingId}`);
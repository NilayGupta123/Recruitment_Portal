import API from "./axios";

export const loginUser = (email, password) =>
  API.post("/auth/login", {
    email,
    password,
  });

export const getCurrentUser = (token) =>
  API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
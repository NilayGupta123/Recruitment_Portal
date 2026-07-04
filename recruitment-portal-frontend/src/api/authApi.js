import API from "./axios";

export const loginUser = (email, password) =>
  API.post("/auth/login", {
    email,
    password,
  });

export const signup = (payload) =>
  API.post("/auth/signup", payload);

export const getCurrentUser = (token) =>
  API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 

export const updateProfile = (payload) =>
  API.put("/users/me", payload);

export const changePassword = (userId, payload) =>
  API.patch(`/users/password/${userId}`, payload);
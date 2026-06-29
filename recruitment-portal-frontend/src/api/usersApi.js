import API from "./axios";

// Get all users
export const getUsers = () =>
  API.get("/users/list");

// Get one user
export const getUser = (userId) =>
  API.get(`/users/get/${userId}`);

// Create user
export const createUser = (data) =>
  API.post("/users/create", data);

// Update user
export const updateUser = (userId, data) =>
  API.put(`/users/put/${userId}`, data);

// Partial Update
export const patchUser = (userId, data) =>
  API.patch(`/users/patch/${userId}`, data);
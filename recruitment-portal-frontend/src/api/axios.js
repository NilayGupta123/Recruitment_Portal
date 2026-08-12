import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function redirectToLogin() {
  const path = window.location.pathname || "";
  if (path === "/login" || path.startsWith("/login?")) return;
  // public routes should not force login on 401
  if (
    path === "/" ||
    path.startsWith("/careers") ||
    path.startsWith("/apply") ||
    path.startsWith("/signup") ||
    path.startsWith("/public")
  ) {
    return;
  }
  window.location.assign = "/login";
}

API.interceptors.request.use((config) => {
  // Don't overwrite an Authorization header already set by the caller
  // (e.g. login → getCurrentUser with the fresh token).
  if (!config.headers?.Authorization) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = String(error?.config?.url || "");
    const isAuthCall =
      url.includes("/auth/login") || url.includes("/auth/signup");

    if (status === 401 && !isAuthCall) {
      clearSession();
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default API;

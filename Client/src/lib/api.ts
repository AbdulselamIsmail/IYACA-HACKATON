import axios from "axios";

// 1. Dynamic URL Selection
// If VITE_API_URL exists (on Render), use it.
// Otherwise, default to http://localhost:5000 (for your computer).
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create the Axios instance
const api = axios.create({
  // We append "/api" here so you don't have to write it in every request
  baseURL: `${BASE_URL}/api`,
});

// 2. Interceptor to add Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // ⚠️ CRITICAL FIX:
      // Your backend middleware checks req.header("token").
      // The previous code sent "auth-token", which would cause a 401 error.
      config.headers["token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

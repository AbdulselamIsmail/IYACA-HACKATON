import axios from "axios";

// Create a connection to your local backend
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically add the JWT Token to every request (if we have one)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["auth-token"] = token;
  }
  return config;
});

export default api;

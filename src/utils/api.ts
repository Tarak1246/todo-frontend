import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor if needed
api.interceptors.request.use(
  (config) => {
    // You can add additional request configurations here, e.g., auth tokens
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor if needed
api.interceptors.response.use(
  (response) => {
    // Process the response data if necessary
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
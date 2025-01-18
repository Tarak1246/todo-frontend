import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth tokens (optional)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    } else {
      console.error(`Network Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// CRUD Operations
const apiService = {
  // Get all tasks
  getTasks: async () => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Get a single task by ID
getTaskById: async (id: string) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
},

  // Create a new task
  createTask: async (task: { title: string; color: string }) => {
    try {
      const response = await api.post("/tasks", task);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update an existing task by ID
  updateTask: async (id: string, updates: { title?: string; color?: string; completed?: boolean }) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a task by ID
  deleteTask: async (id: string) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      throw error;
    }
  },
};

export default apiService;
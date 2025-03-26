import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Adjust for production

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle global API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ✅ API FUNCTIONS (without authentication)
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const submitFeedback = async (userType, rating, comment) => {
  try {
    const response = await api.post("/submit-feedback", {
      userType,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const generateExam = async (subject, difficulty, numQuestions) => {
  try {
    const response = await api.post("/generate-exam", {
      subject,
      difficulty,
      numQuestions,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;

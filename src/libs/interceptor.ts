import axios from "axios";
import { BASE_URL } from "../constants/endpoint";
import LocalStorageService from "../services/local-storage.service";
import { IUser } from "../features/auth/types/auth.type";

// Create an Axios instance
const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request Interceptor
http.interceptors.request.use(
  (config) => {
    const user = LocalStorageService.getItem<IUser>("user");
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("Unauthorized! Redirecting to login.");
      } else if (status === 500) {
        console.error("Server error! Please try again later.");
      }
    } else if (error.request) {
      console.error("Network error! Please check your connection.");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default http;

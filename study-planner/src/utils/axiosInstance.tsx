import axios from 'axios';
import AuthService from '../services/AuthService';

const API_URL = 'https://localhost:7113';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This ensures cookies (HttpOnly) are sent with requests
});


// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use((response) => response, async (error) => { // If the response is successful, return it
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite loops

      try {
        // Attempt to refresh the token
        await AuthService.refreshToken(); // AuthService should handle calling the refresh token endpoint
        
        // Retry the original request after token refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, log the user out or handle it appropriately
        AuthService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Return other errors if there are any
  }
);
export default axiosInstance;
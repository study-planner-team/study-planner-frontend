import axios from 'axios';
import axiosInstance from '../utils/axiosInstance'

class AuthService {
  async register(username: string, password: string, email: string) {
    try {
      const response = await axiosInstance.post("/api/users/register", {username: username, password: password, email: email});
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error)
    }
  }

  async login(username: string, password: string,) {
    try {
      const response = await axiosInstance.post("/api/users/login", {username: username, password: password});
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  async logout() {
    try {
      const response = await axiosInstance.post("/api/users/logout");
      return response
    } catch (error) {
        console.error("Failed to logout:", error);
        if (axios.isAxiosError(error) && error.response) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
  }

  async refreshToken() {
    try {
      const response = await axiosInstance.post("/api/users/refresh-token", null);
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }
  
}


export default new AuthService();
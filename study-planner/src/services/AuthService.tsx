import axios from 'axios';
import axiosInstance from '../utils/axiosInstance'
import { handleError } from "../utils/errorHandler";

class AuthService {
  async register(username: string, password: string, email: string) {
    try {
      const response = await axiosInstance.post("/api/users/register", {
        username: username,
        password: password,
        email: email
      });
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się zarejestrować użytkownika");
      return null;
    }
  }

  async login(username: string, password: string) {
    try {
      const response = await axiosInstance.post("/api/users/login", {
        username: username,
        password: password
      });
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się zalogować");
      return null;
    }
  }

  async logout() {
    try {
      const response = await axiosInstance.post("/api/users/logout");
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się wylogować");
      return null;
    }
  }

  async refreshToken() {
    try {
      const response = await axiosInstance.post("/api/users/refresh-token", null);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się odświeżyć tokenu");
      return null;
    }
  }

  async updateUser(userId: number, userData: any) {
    try {
      const response = await axiosInstance.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się zaktualizować użytkownika");
      return null;
    }
  }

  async deleteUser(userId: number) {
    try {
      const response = await axiosInstance.delete(`/api/users/${userId}`);
      return response.data; 
    } catch (error) {
      handleError(error, "Nie udało się usunąć użytkownika");
      return null;
    }
  }

  async exchangeGoogleCode(authorizationCode: string) {
    try {
      const response = await axiosInstance.post(
        "/api/users/exchange-google-code",
        authorizationCode,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się wymienić kodu Google");
      return null;
    }
  }
}

export default new AuthService();
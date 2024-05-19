import axios from 'axios';

const API_URL = 'https://localhost:7113/api';

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

class AuthService {
  async register(data: RegisterRequest) {
    try {
      const response = await axios.post(API_URL + "/users/register", data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      throw error;
    }
  }
}

export default new AuthService();
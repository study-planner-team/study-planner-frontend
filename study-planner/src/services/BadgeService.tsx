import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandler";

class BadgeService {
  async fetchUserBadges(userId: number) {
    try {
      const response = await axiosInstance.get(`/api/users/${userId}/badges`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać odznak");
      return null;
    }
  }

  async fetchPublicUsersWithBadges() {
    try {
      const response = await axiosInstance.get(`/api/users/profiles/public`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać publicznych użytkowników");
      return null;
    }
  }
}

export default new BadgeService();
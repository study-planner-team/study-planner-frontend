import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandler";

class StatisticService {
    async getStatistics() {
        try {
          const response = await axiosInstance.get("/api/statistics");
          return response.data; 
        } catch (error) {
          handleError(error, "Nie udało się pobrać aktualnych statystyk");
          return null;
        }
      }

}

export default new StatisticService();
import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandler";

class ScheduleService {
  async getSchedules() {
    try {
      const response = await axiosInstance.get("/api/schedules");
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać harmonogramów");
      return null;
    }
  }

  async getSchedulesById(scheduleId: number) {
    try {
      const response = await axiosInstance.get(`/api/schedules/${scheduleId}`);
      return response.data;
    } catch (error) {
      handleError(error, `Nie udało się pobrać harmonogramu o id ${scheduleId}`);
      return null;
    }
  }
}

export default new ScheduleService();
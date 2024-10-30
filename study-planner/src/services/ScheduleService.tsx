import axiosInstance from "../utils/axiosInstance";

class ScheduleService {
  async getSchedules() {
    try {
      const response = await axiosInstance.get("/api/schedules");
      return response.data;
    } catch (error) {
      console.error("Couldn't fetch schedules", error);
      throw error;
    }
  }

  async getSchedulesById(scheduleId: number) {
    try {
      const response = await axiosInstance.get(`/api/schedules/${scheduleId}`);
      return response.data;
    } catch (error) {
      console.error(`Couldn't fetch schedule with id ${scheduleId}`, error);
      throw error;
    }
  }
}
export default new ScheduleService();

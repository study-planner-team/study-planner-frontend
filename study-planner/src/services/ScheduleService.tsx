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

  async startSession(sessionId: number) {
    try {
      const response = await axiosInstance.post(`/api/schedules/${sessionId}/start`);
      return response.data;
    } catch (error) {
      console.error("Error starting session:", error);
      throw error;
    }
  }

  async endSession(sessionId: number) {
    try {
      const response = await axiosInstance.post(`/api/schedules/${sessionId}/end`);
      return response.data;
    } catch (error) {
      console.error("Error ending session:", error);
      throw error;
    }
  }

  async getCurrentSession() {
    try {
      const response = await axiosInstance.get("/api/schedules/current");
      return response.data; 
    } catch (error) {
      handleError(error, "Nie udało się pobrać aktywnej sesji nauki");
      return null;
    }
  }

  async getFinishedSessions() {
    try {
      const response = await axiosInstance.get("/api/schedules/completed");
      return response.data; 
    } catch (error) {
      handleError(error, "Nie udało się pobrać ukończonych sesji nauki");
      return null;
    }
  }

  async getUpcomingSession() {
    try {
      const response = await axiosInstance.get("/api/schedules/next");
      return response.data; 
    } catch (error) {
      handleError(error, "Nie udało się pobrać nadchodzącej sesji nauki");
      return null;
    }
  }
}

export default new ScheduleService();
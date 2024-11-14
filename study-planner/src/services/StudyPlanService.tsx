import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandler";

class StudyPlanService {
  async getStudyPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans");
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać planów nauki");
      return null;
    }
  }

  async getStudyPlanById(planId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${planId}`);
      return response.data;
    } catch (error) {
      handleError(error, `Nie udało się pobrać planu nauki o id ${planId}`);
      return null;
    }
  }

  async createStudyPlan(studyPlanData: any) {
    try {
      const response = await axiosInstance.post("/api/studyplans", studyPlanData);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się utworzyć planu nauki");
      return null;
    }
  }

  async updateStudyPlan(planId: number, updatedData: any) {
    try {
      const response = await axiosInstance.put(`/api/studyplans/${planId}`, updatedData);
      return response.data;
    } catch (error) {
      handleError(error, `Nie udało się zaktualizować planu nauki o id ${planId}`);
      return null;
    }
  }

  async archiveStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.put(`/api/studyplans/${planId}/archive`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się zarchiwizować planu nauki");
      return null;
    }
  }

  async getArchivedStudyPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans/archived");
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać zarchiwizowanych planów nauki");
      return null;
    }
  }

  async unarchiveStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.put(`/api/studyplans/${planId}/unarchive`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się odarchiwizować planu nauki");
      return null;
    }
  }

  async getPublicPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans/public");
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać publicznych planów nauki");
      return null;
    }
  }

  async joinStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${planId}/join`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się dołączyć do planu nauki");
      return null;
    }
  }

  async leaveStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${planId}/leave`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się opuścić planu nauki");
      return null;
    }
  }

  async getJoinedPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans/joined");
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać planów nauki, do których dołączyłeś");
      return null;
    }
  }

  async getMembersByPlanId(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/members`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać członków planu nauki");
      return null;
    }
  }

  async changePlanOwner(studyPlanId: number, newOwnerId: number) {
    try {
      const response = await axiosInstance.post(
        `/api/studyplans/${studyPlanId}/change-owner`,
        newOwnerId,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się zmienić właściciela planu nauki");
      return null;
    }
  }

  async generateSchedule(scheduleData: any) {
    try {
      const response = await axiosInstance.post("/api/schedules/generate", scheduleData);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się wygenerować harmonogramu");
      return null;
    }
  }
}

export default new StudyPlanService();

import axiosInstance from "../utils/axiosInstance";

class StudyPlanService {
  async getStudyPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans");
      return response.data;
    } catch (error) {
      console.error("Error fetching study plans", error);
      throw error;
    }
  }

  async getStudyPlanById(planId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${planId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching study plan with id ${planId}`, error);
      throw error;
    }
  }

  async createStudyPlan(studyPlanData: any) {
    try {
      const response = await axiosInstance.post(
        "/api/studyplans",
        studyPlanData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating study plan:", error);
      throw error;
    }
  }

  async updateStudyPlan(planId: number, updatedData: any) {
    try {
      const response = await axiosInstance.put(
        `/api/studyplans/${planId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating study plan with id ${planId}`, error);
      throw error;
    }
  }

  async archiveStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.put(`/api/studyplans/${planId}/archive`);
      return response.data;
    } catch (error) {
      console.error("Error archiving study plan:", error);
      throw error;
    }
  }

  async getArchivedStudyPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans/archived");
      return response.data;
    } catch (error) {
      console.error("Error fetching archived study plans:", error);
      throw error;
    }
  }

  async unarchiveStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.put(`/api/studyplans/${planId}/unarchive`);
      return response.data;
    } catch (error) {
      console.error("Error unarchiving study plan:", error);
      throw error;
    }
  }

  async getPublicPlans() {
    try {
      const response = await axiosInstance.get("/api/studyplans/public");
      return response.data;
    } catch (error) {
      console.error("Error fetching study plans", error);
      throw error;
    }
  }

  async joinStudyPlan(planId: number) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${planId}/join`);
      return response.data;
    } catch (error) {
      console.error("Error joining study plan:", error);
      throw error;
    }
  }

  async generateSchedule(scheduleData: any) {
    try {
      const response = await axiosInstance.post("/api/schedules/generate", scheduleData);
      return response.data;
    } catch (error) {
      console.error("Error generating schedule:", error);
      throw error;
    }
  }
  
}
export default new StudyPlanService();

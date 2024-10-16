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
}
export default new StudyPlanService();

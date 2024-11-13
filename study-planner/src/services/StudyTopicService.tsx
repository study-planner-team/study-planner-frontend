import axiosInstance from "../utils/axiosInstance";

class StudyTopicService {
  async getTopicsByPlanId(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/topics`);
      return response.data;
    } catch (error) {
      console.error("Error fetching study topics:", error);
      throw error;
    }
  }

  async addTopic(studyPlanId: number, topicData: { title: string; hours: number}) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${studyPlanId}/topics`, topicData);
      return response.data;
    } catch (error) {
      console.error("Error adding topic:", error);
      throw error;
    }
  }

  async addMaterial(studyTopicId: number, materialData: { title: string; link: string}) {
    try {
      const response = await axiosInstance.post(`/api/topics/${studyTopicId}/materials`, materialData);
      return response.data;
    } catch (error) {
      console.error("Error adding topic:", error);
      throw error;
    }
  }
}

export default new StudyTopicService();
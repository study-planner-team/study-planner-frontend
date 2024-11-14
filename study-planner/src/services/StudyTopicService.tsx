import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandler";

class StudyTopicService {
  async getTopicsByPlanId(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/topics`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać tematów do planu nauki");
      return null;
    }
  }

  async getMaterialsByTopicId(studyTopicId: number) {
    try {
      const response = await axiosInstance.get(`/api/topics/${studyTopicId}/materials`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się dodać tematu do planu nauki");
      return null;
    }
  }

  async addTopic(studyPlanId: number, topicData: { title: string; hours: number}) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${studyPlanId}/topics`, topicData);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się dodać nowego tematu");
      return null;
    }
  }

  async addMaterial(studyTopicId: number, materialData: { title: string; link: string}) {
    try {
      const response = await axiosInstance.post(`/api/topics/${studyTopicId}/materials`, materialData);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się dodać nowego materiału");
      return null;
    }
  }
}

export default new StudyTopicService();
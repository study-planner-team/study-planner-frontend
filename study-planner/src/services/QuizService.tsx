import { Quiz, QuizWithQuestions } from "../types/quizTypes";
import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandler";

class QuizService {
  async getQuizzesByPlanId(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/quizzes`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać quizów dla planu nauki");
      return null;
    }
  }

  async getQuizById(studyPlanId: number, quizId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/quizzes/${quizId}`);
      return response.data;
    } catch (error) {
      handleError(error, `Nie udało się pobrać danych dla quziu z ID: ${quizId}`);
      return null;
    }
  }

  async getCreatedQuizzes(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/quizzes/created`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać utworzonych quizów");
      return null;
    }
  }

  async getAssignedQuizzes(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/quizzes/assigned`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać przypisanych quizów");
      return null;
    }
  }

  async getCompletedQuizzes(studyPlanId: number) {
    try {
      const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/quizzes/completed`);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się pobrać ukończonych quizów");
      return null;
    }
  }

  async getAssignedQuizById(studyPlanId: number, quizId: number) {
    try {
        const response = await axiosInstance.get(`/api/studyplans/${studyPlanId}/quizzes/assigned/${quizId}`);
        return response.data;
    } catch (error) {
        handleError(error, "Nie udało się pobrać przypisanego quizu");
        return null;
    }
}

  async addQuiz(studyPlanId: number, quizData: QuizWithQuestions) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${studyPlanId}/quizzes/create`, quizData);
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się dodać nowego quizu");
      return null;
    }
  }

  async deleteQuiz(studyPlanId: number, quizId: number) {
    try {
      const response = await axiosInstance.delete(`/api/studyplans/${studyPlanId}/quizzes/${quizId}`);
      return response;
    } catch (error) {
      handleError(error, "Nie udało się usunąć quizu");
      return null;
    }
  }

  async assignQuiz(studyPlanId: number, quizId: number, userId: number) {
    try {
      const response = await axiosInstance.post(`/api/studyplans/${studyPlanId}/quizzes/${quizId}/assign`, userId,
        { headers: { "Content-Type": "application/json" } });
      return response.data;
    } catch (error) {
      handleError(
        error,
        "Nie udało się przypisać quizu do wybranego użytkownika"
      );
      return null;
    }
  }

  async completeQuiz(studyPlanId: number, assignmentId: number, correctAnswers: number, totalQuestions: number) {
    try {
      const response = await axiosInstance.put(
        `/api/studyplans/${studyPlanId}/quizzes/assigned/${assignmentId}/complete`,
        { correctAnswers, totalQuestions } 
      );
      return response.data;
    } catch (error) {
      handleError(error, "Nie udało się ukończyć quizu");
      return null;
    }
  }
  
}

export default new QuizService();
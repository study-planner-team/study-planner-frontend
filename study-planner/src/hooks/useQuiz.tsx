import { useEffect, useState } from "react";
import QuizService from "../services/QuizService";
import { Quiz, QuizAssignment, QuizWithQuestions } from "../types/quizTypes";
import { toast } from 'react-toastify';

export const useQuiz = (studyPlanId: number) => {
  const [createdQuizzes, setCreatedQuizzes] = useState<Quiz[]>([]);
  const [assignedQuizzes, setAssignedQuizzes] = useState<QuizAssignment[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<QuizAssignment[]>([]);
  const [quizModalShow, setQuizModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchCreatedQuizzes();
    fetchAssignedQuizzes();
    fetchCompletedQuizzes();
  }, [studyPlanId]);

  const fetchCreatedQuizzes = async () => {
    const quizzesResponse = await QuizService.getCreatedQuizzes(studyPlanId);
    if (quizzesResponse) {
      setCreatedQuizzes(quizzesResponse)
    }
  };

  const fetchAssignedQuizzes = async () => {
    const quizzesResponse = await QuizService.getAssignedQuizzes(studyPlanId);
    if (quizzesResponse) {
      setAssignedQuizzes(quizzesResponse)
    }
  };

  const fetchCompletedQuizzes = async () => {
    const quizzesResponse = await QuizService.getCompletedQuizzes(studyPlanId);
    if (quizzesResponse) {
        setCompletedQuizzes(quizzesResponse);
    }
};

  const handleAddQuiz = async (quizData: QuizWithQuestions) => {
    const addedQuiz = await QuizService.addQuiz(studyPlanId, quizData);
    if (addedQuiz) {
      setCreatedQuizzes((prev) => [...prev, addedQuiz]);
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    const result = await QuizService.deleteQuiz(studyPlanId, quizId);
    if (result) {
      setCreatedQuizzes((prev) => prev.filter((quiz) => quiz.quizId !== quizId));
    }
  };

  const handleAssignQuiz = async (quizId: number, userId: number) => {
    const result = await QuizService.assignQuiz(studyPlanId, quizId, userId);
    if(result) {
      toast.success("Przypisano quiz do wybranego użytkownika!");
    }
  };

  return {
    createdQuizzes,
    assignedQuizzes,
    completedQuizzes,
    quizModalShow,
    setQuizModalShow,
    handleAddQuiz,
    handleDeleteQuiz,
    handleAssignQuiz
  };
};
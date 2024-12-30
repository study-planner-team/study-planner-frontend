import { useEffect, useState } from "react";
import QuizService from "../services/QuizService";
import { Question, QuizAssignment, UserAnswerDTO} from "../types/quizTypes";
import { useNavigate } from "react-router-dom";

export const useActiveQuiz = (studyPlanId: number, quizId: number) => {
    const navigate = useNavigate();
    const [activeQuiz, setActiveQuiz] = useState<QuizAssignment>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [questionIndex: number]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (quizId) {
        fetchQuiz(quizId);
      }
    }, [quizId]);
    

    const fetchQuiz = async (quizId: number) => {
      const response = await QuizService.getAssignedQuizById(studyPlanId, quizId);
      if (response) {
        setActiveQuiz(response);
        setQuestions(response.quiz.questions);
        setLoading(false);
      }
    };

    const handleOptionSelect = (questionIndex: number,selectedOptionIndex: number) => {
      setAnswers((prevAnswers) => ({...prevAnswers,[questionIndex]: selectedOptionIndex}));
    };

    const handleSubmit = async () => {
      const userAnswers: UserAnswerDTO[] = questions.map((question, questionIndex) => ({
        questionId: question.questionId!,
        selectedOptionId: question.options[answers[questionIndex]].optionId!,
      }));
      
      const updatedAssignment = await QuizService.completeQuiz(studyPlanId, activeQuiz?.assignmentId!, userAnswers);

      navigate(`/studyplans/${studyPlanId}/quizzes/${quizId}/score`, {
        state: {
          score: updatedAssignment.correctAnswers! / updatedAssignment.totalQuestions! * 100,
          correctAnswers: updatedAssignment.correctAnswers,
          totalQuestions: updatedAssignment.totalQuestions,
          questions: updatedAssignment.quiz.questions,
          answers: answers,
          studyPlanId
        },
      });
    };

  return {
    activeQuiz,
    questions,
    answers,
    fetchQuiz,
    handleOptionSelect,
    handleSubmit,
    loading
  };
};
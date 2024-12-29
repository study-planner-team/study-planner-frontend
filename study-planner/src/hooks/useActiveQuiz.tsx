import { useEffect, useState } from "react";
import QuizService from "../services/QuizService";
import { Question, QuizAssignment} from "../types/quizTypes";
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

    const calculateQuizResults = () => {
      let correctAnswers = 0;

      questions.forEach((question, questionIndex) => {
        const correctOptionIndex = question.options.findIndex(
          (option) => option.isCorrect
        );
        if (answers[questionIndex] === correctOptionIndex) {
          correctAnswers++;
        }
      });

      const totalQuestions = questions.length;
      const score = (correctAnswers / totalQuestions) * 100;

      return { score, correctAnswers, totalQuestions };
    };

    const handleOptionSelect = (questionIndex: number,selectedOptionIndex: number) => {
      setAnswers((prevAnswers) => ({...prevAnswers,[questionIndex]: selectedOptionIndex}));
    };

    const handleSubmit = async () => {
      const { score, correctAnswers, totalQuestions } = calculateQuizResults();

      await QuizService.completeQuiz(studyPlanId, activeQuiz?.assignmentId!, correctAnswers, totalQuestions);

      navigate(`/studyplans/${studyPlanId}/quizzes/${quizId}/score`, {
        state: {
          score,
          correctAnswers,
          totalQuestions,
          questions,
          answers,
        },
      });
    };

  return {
    activeQuiz,
    questions,
    answers,
    fetchQuiz,
    calculateQuizResults,
    handleOptionSelect,
    handleSubmit,
    loading
  };
};
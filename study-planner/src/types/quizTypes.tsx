export interface Quiz {
  quizId?: number;
  studyPlanId?: number;
  createdByUserId?: number;
  title: string;
  description?: string;
}

export interface QuizWithQuestions extends Quiz {
  questions: Question[];
}

export interface Question {
  questionId?: number,
  questionText: string;
  options: Option[];
}

export interface Option {
  optionId?: number,
  optionText: string;
  isCorrect?: boolean;
}

export interface QuizAssignment {
  assignmentId: number;
  asignedOn: Date;
  state: string;
  correctAnswers?: number;
  totalQuestions?: number;
  quiz: QuizWithQuestions;
}
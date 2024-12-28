export interface Quiz {
    quizId?: number;
    title: string;
    description?: string;
    createdByUserId?: number;
    studyPlanId?: number;
  }
  
  export interface QuizWithQuestions {
    title: string; 
    description?: string; 
    questions: Question[];
  }
  
  export interface Question {
    questionText: string;
    options: Option[];
  }
  
  export interface Option {
    optionText: string;
    isCorrect: boolean;
  }
  
  export interface QuizAssignment {
    assignmentId: number;
    asignedOn: Date;
    state: string;
    correctAnswers?: number;
    totalQuestions?: number;
    quiz: Quiz;
  }
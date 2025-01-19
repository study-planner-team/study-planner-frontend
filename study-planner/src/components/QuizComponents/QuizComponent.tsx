import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Quiz, QuizAssignment } from "../../types/quizTypes";
import { useNavigate } from "react-router-dom";
import AssignQuizModal from "./AssignQuizModal";

interface QuizComponentProps {
  createdQuiz?: Quiz;
  assignedQuiz?: QuizAssignment;
  members: { userId: number; username: string }[];
  onDelete: (quizId: number) => void;
  onAssign: (quizId: number, userId: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  createdQuiz,
  assignedQuiz,
  members,
  onDelete,
  onAssign,
}) => {
  const { t } = useTranslation("global"); 
  const navigate = useNavigate();
  const [assignModalShow, setAssignModalShow] = useState(false);
  const quizData = createdQuiz || assignedQuiz?.quiz;

  if (!quizData) {
    return <p>{t("quiz.noQuizData")}</p>;
  }

  const handleStartQuiz = () => {
    if (assignedQuiz) {
      navigate(`/studyplans/${quizData.studyPlanId}/quizzes/${quizData.quizId}`);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{quizData.title}</Card.Title>
        {quizData.description && <Card.Text>{quizData.description}</Card.Text>}
        <div className="d-flex justify-content-between flex-wrap gap-2">
          {createdQuiz && (
            <>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(quizData.quizId!)}
              >
                {t("common.delete")}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setAssignModalShow(true)}
              >
                {t("quiz.assignQuiz")}
              </Button>
            </>
          )}

          {assignedQuiz && assignedQuiz.state === "Assigned" && (
            <Button variant="success" size="sm" onClick={handleStartQuiz}>
              {t("quiz.startQuiz")}
            </Button>
          )}

          {assignedQuiz && assignedQuiz.state === "Completed" && (
            <div className="text">
              <strong>{t("quiz.score")}:</strong> {assignedQuiz.correctAnswers}{" "}
              / {assignedQuiz.totalQuestions}
            </div>
          )}
        </div>
      </Card.Body>

      {createdQuiz && (
        <AssignQuizModal
          show={assignModalShow}
          onHide={() => setAssignModalShow(false)}
          quizId={quizData.quizId!}
          members={members.filter(
            (member) => member.userId !== quizData.createdByUserId
          )}
          onAssign={onAssign} 
        />
      )}
    </Card>
  );
};

export default QuizComponent;

import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useQuiz } from "../../hooks/useQuiz";
import "../../styles/QuizStyles.css";
import AddQuizFormModal from "./AddQuizFormModal";
import QuizComponent from "./QuizComponent";
import { useTranslation } from "react-i18next";

interface QuizBlockProps {
  studyPlanId: number;
  canViewDetails: boolean;
  members: { userId: number; username: string }[];
}

const QuizBlock: React.FC<QuizBlockProps> = ({
  studyPlanId,
  canViewDetails,
  members,
}) => {
  const { t } = useTranslation("global");
  const {
    createdQuizzes,
    assignedQuizzes,
    completedQuizzes,
    quizModalShow,
    setQuizModalShow,
    handleAddQuiz,
    handleDeleteQuiz,
    handleAssignQuiz,
  } = useQuiz(studyPlanId);

  return (
    <div className="quiz-block mt-4">
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center custom-card-header">
              <h5 className="mb-0">{t("quiz.createdQuizzes")}</h5>
              {canViewDetails && (
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => setQuizModalShow(true)}
                  style={{ minWidth: "100px", textAlign: "center" }}
                >
                  {t("quiz.addQuiz")}
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {createdQuizzes.length > 0 ? (
                createdQuizzes.map((quiz) => (
                  <QuizComponent
                    key={quiz.quizId}
                    createdQuiz={quiz}
                    members={members}
                    onDelete={handleDeleteQuiz}
                    onAssign={handleAssignQuiz}
                  />
                ))
              ) : (
                <p className="text-muted">{t("quiz.noQuizzes")}</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center custom-card-header">
              <h5 className="mb-0">{t("quiz.assignedQuizzes")}</h5>
            </Card.Header>
            <Card.Body>
              {assignedQuizzes.length > 0 ? (
                assignedQuizzes.map((quiz) => (
                  <QuizComponent
                    key={quiz.assignmentId}
                    assignedQuiz={quiz}
                    members={members}
                    onDelete={handleDeleteQuiz}
                    onAssign={handleAssignQuiz}
                  />
                ))
              ) : (
                <p className="text-muted">{t("quiz.noQuizzes")}</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center custom-card-header">
              <h5 className="mb-0">{t("quiz.completedQuizzes")}</h5>
            </Card.Header>
            <Card.Body>
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map((quiz) => (
                  <QuizComponent
                    key={quiz.assignmentId}
                    assignedQuiz={quiz}
                    members={members}
                    onDelete={() => {}} // Disable delete for completed quizzes
                    onAssign={() => {}} // Disable assign for completed quizzes
                  />
                ))
              ) : (
                <p className="text-muted">{t("quiz.noQuizzes")}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <AddQuizFormModal
        show={quizModalShow}
        onHide={() => setQuizModalShow(false)}
        onSubmit={(newQuiz) => handleAddQuiz(newQuiz)}
      />
    </div>
  );
};

export default QuizBlock;

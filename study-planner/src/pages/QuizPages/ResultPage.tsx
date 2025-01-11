import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Question } from "../../types/quizTypes";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { useTranslation } from "react-i18next";

const ResultPage: React.FC = () => {
  const { t } = useTranslation("global");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    score,
    correctAnswers,
    totalQuestions,
    questions,
    answers,
    studyPlanId,
  } = location.state as {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    questions: Question[];
    answers: { [questionIndex: number]: number };
    studyPlanId: number;
  };

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="text-center">
            <h1>{t("quiz.completed")}</h1>
            <h2>
              {t("quiz.yourScore", {
                correctAnswers,
                totalQuestions,
                score: score.toFixed(2),
              })}
            </h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{t("quiz.yourResults")}</Card.Title>
                <ListGroup variant="flush">
                  {questions.map((question, index) => {
                    const userAnswer = answers[index];
                    const correctOptionIndex = question.options.findIndex(
                      (option) => option.isCorrect
                    );

                    return (
                      <ListGroup.Item key={index}>
                        <strong>
                          {t("quiz.question")} {index + 1}:
                        </strong>{" "}
                        {question.questionText}
                        <br />
                        <span
                          className={
                            userAnswer === correctOptionIndex
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          <strong>{t("quiz.yourAnswer")}:</strong>{" "}
                          {question.options[userAnswer]?.optionText ||
                            t("quiz.noAnswer")}
                        </span>
                        <br />
                        <span className="text-success">
                          <strong>{t("quiz.correctAnswer")}:</strong>{" "}
                          {question.options[correctOptionIndex].optionText}
                        </span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Button
              variant="primary"
              onClick={() => navigate(`/studyplans/${studyPlanId}`)}
            >
              {t("quiz.backToDashboard")}
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ResultPage;

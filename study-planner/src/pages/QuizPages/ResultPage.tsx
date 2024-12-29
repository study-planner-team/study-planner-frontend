import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { Question } from "../../types/quizTypes";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, correctAnswers, totalQuestions, questions, answers } = location.state as {
    score: number;
    correctAnswers: number;
    totalQuestions: number; 
    questions: Question[];
    answers: { [questionIndex: number]: number };
  };

  return (
    <>
      <Header /> 
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="text-center">
            <h1>Quiz Completed!</h1>
            <h2>Your Score: {correctAnswers}/{totalQuestions} ({score}%)</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title as="h5">Your Results</Card.Title>
                <ListGroup variant="flush">
                  {questions.map((question, questionIndex) => {
                    const userAnswer = answers[questionIndex];
                    const correctOptionIndex = question.options.findIndex(
                      (option) => option.isCorrect
                    );

                    return (
                      <ListGroup.Item key={questionIndex}>
                        <strong>Question {questionIndex + 1}:</strong> {question.questionText}
                        <br />
                        <span
                          className={
                            userAnswer === correctOptionIndex ? "text-success" : "text-danger"
                          }
                        >
                          <strong>Your Answer:</strong>{" "}
                          {question.options[userAnswer]?.optionText || "No Answer"}
                        </span>
                        <br />
                        <span className="text-success">
                          <strong>Correct Answer:</strong>{" "}
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
            <Button variant="primary" onClick={() => navigate("/")}>Back to Dashboard</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ResultPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col, Card} from "react-bootstrap";
import QuizService from "../../services/QuizService";
import { Question, QuizAssignment } from "../../types/quizTypes";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { useActiveQuiz } from "../../hooks/useActiveQuiz";

const QuizPage: React.FC = () => {
  const { studyPlanId, quizId } = useParams<{ studyPlanId: string; quizId: string }>();
  const {activeQuiz, questions, answers, handleOptionSelect, handleSubmit, loading} = useActiveQuiz(parseInt(studyPlanId!), parseInt(quizId!));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Loading quiz...</p>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="text-center">
            <h2>Quiz: {activeQuiz?.quiz.title}</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title as="h5">
                  Pytanie {currentQuestionIndex + 1} z {questions.length}
                </Card.Title>
                <Card.Text>{currentQuestion.questionText}</Card.Text>
                <Form>
                  {currentQuestion.options.map((option, optionIndex) => (
                    <Form.Check
                      key={optionIndex}
                      type="radio"
                      label={option.optionText}
                      name={`question-${currentQuestionIndex}`}
                      checked={answers[currentQuestionIndex] == optionIndex}
                      onChange={() =>
                        handleOptionSelect(currentQuestionIndex, optionIndex)
                      }
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-around">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentQuestionIndex == 0}
            >
              Back
            </Button>
            {currentQuestionIndex == questions.length - 1 ? (
              <Button variant="primary" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default QuizPage;
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { QuizWithQuestions, Question, Option } from "../../types/quizTypes";

interface AddQuizFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (quizData: QuizWithQuestions) => void;
}

const AddQuizFormModal: React.FC<AddQuizFormModalProps> = ({show, onHide, onSubmit}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);

  // Add a new question with default options
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: Array(4).fill({ optionText: "", isCorrect: false }),
      } as Question,
    ]);
  };

  // Update a specific question's text
  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };

  // Update a specific option (text or isCorrect)
  const updateOption = (questionIndex: number, optionIndex: number, updatedValue: Partial<Option>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      ...updatedValue,
    };
    setQuestions(updatedQuestions);
  };

    // Remove a question by index
    const removeQuestion = (questionIndex: number) => {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((_, index) => index !== questionIndex)
      );
    };
  

  // Handle submit
  const handleSubmit = () => {
    const payload: QuizWithQuestions = { title, description, questions };
    onSubmit(payload);
    onHide();
    setTitle("");
    setDescription("");
    setQuestions([]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter quiz description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <h5>Questions</h5>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-3">
              <Form.Group>
                <Form.Label>Question {questionIndex + 1}</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Enter question text"
                      defaultValue={question.questionText}
                      onBlur={(e) =>
                        updateQuestionText(questionIndex, e.target.value)
                      }
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeQuestion(questionIndex)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <h6>Options</h6>
              {question.options.map((option, optionIndex) => (
                <Row key={optionIndex} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      defaultValue={option.optionText}
                      onBlur={(e) =>
                        updateOption(questionIndex, optionIndex, {
                          optionText: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col xs="auto">
                    <Form.Check
                      type="checkbox"
                      label="Correct"
                      defaultChecked={option.isCorrect}
                      onChange={(e) =>
                        updateOption(questionIndex, optionIndex, {
                          isCorrect: e.target.checked,
                        })
                      }
                    />
                  </Col>
                </Row>
              ))}
            </div>
          ))}
          <Button variant="secondary" onClick={addQuestion}>
            Add Question
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Quiz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuizFormModal;

import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { QuizWithQuestions, Question, Option } from "../../types/quizTypes";

interface AddQuizFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (quizData: QuizWithQuestions) => void;
}

const AddQuizFormModal: React.FC<AddQuizFormModalProps> = ({ show, onHide, onSubmit }) => {
  const { t } = useTranslation("global"); // Use the "global" namespace for translations

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: Array(4).fill({ optionText: "", isCorrect: false }),
      } as Question,
    ]);
  };

  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, updatedValue: Partial<Option>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      ...updatedValue,
    };
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (questionIndex: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== questionIndex)
    );
  };

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
        <Modal.Title>{t("quiz.modalTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t("quiz.title")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("quiz.titlePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("quiz.description")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t("quiz.descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <h5>{t("quiz.questions")}</h5>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-3">
              <Form.Group>
                <Form.Label>{t("quiz.question")} {questionIndex + 1}</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={t("quiz.questionPlaceholder")}
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
                      {t("quiz.removeQuestion")}
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <h6>{t("quiz.options")}</h6>
              {question.options.map((option, optionIndex) => (
                <Row key={optionIndex} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={`${t("quiz.option")} ${optionIndex + 1}`}
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
                      label={t("quiz.correct")}
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
            {t("quiz.addQuestion")}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("common.cancel")}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {t("quiz.addQuiz")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuizFormModal;

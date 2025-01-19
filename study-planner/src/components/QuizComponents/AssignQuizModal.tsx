import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";


interface AssignQuizModalProps {
  show: boolean;
  onHide: () => void;
  quizId: number;
  members: { userId: number; username: string }[];
  onAssign: (quizId: number, userId: number) => void;
}

const AssignQuizModal: React.FC<AssignQuizModalProps> = ({ show, onHide, quizId, members, onAssign }) => {
  const { t } = useTranslation("global");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleAssign = () => {
    if (selectedUserId !== null) {
      onAssign(quizId, selectedUserId);
      setSelectedUserId(null);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t("quiz.assignQuiz")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {members.map((member) => (
            <Form.Check
              key={member.userId}
              type="radio"
              name="member"
              label={member.username}
              value={member.userId}
              checked={selectedUserId === member.userId}
              onChange={() => setSelectedUserId(member.userId)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("common.cancel")}
        </Button>
        <Button variant="primary" onClick={handleAssign} disabled={selectedUserId == null}>
          {t("quiz.assignQuiz")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignQuizModal;
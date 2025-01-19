import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations

interface AddTopicFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (topicData: { title: string; hours: number }) => void;
}

const AddTopicFormModal: React.FC<AddTopicFormModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const { t } = useTranslation("global");
  const [title, setTitle] = useState<string>("");
  const [hours, setHours] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof hours === "number" && hours > 0) {
      onSubmit({ title, hours });
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("studyTopics.addTopic")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>{t("studyTopics.topicName")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("studyTopics.topicNamePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="hours" className="mt-3">
            <Form.Label>{t("studyTopics.hours")}</Form.Label>
            <Form.Control
              type="number"
              placeholder={t("studyTopics.hoursPlaceholder")}
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              {t("common.cancel")}
            </Button>
            <Button variant="primary" type="submit">
              {t("common.add")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTopicFormModal;

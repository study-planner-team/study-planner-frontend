import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface AddTopicFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (topicData: { title: string; hours: number }) => void;
}

const AddTopicFormModal: React.FC<AddTopicFormModalProps> = ({ show, onHide, onSubmit }) => {
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
        <Modal.Title>Dodaj Zakres Materiału</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Nazwa tematu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Podaj nazwę tematu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="hours" className="mt-3">
            <Form.Label>Ilość godzin</Form.Label>
            <Form.Control
              type="number"
              placeholder="Podaj ilość godzin"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Zamknij
            </Button>
            <Button variant="primary" type="submit">
              Dodaj
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTopicFormModal;

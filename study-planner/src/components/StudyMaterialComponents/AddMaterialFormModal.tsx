import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface AddMaterialModalProps {
  topicId: number;
  show: boolean;
  onHide: () => void;
  onSubmit: (topicId: number, materialData: { title: string; link: string }) => void;
}

const AddMaterialFormModal: React.FC<AddMaterialModalProps> = ({ topicId, show, onHide, onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(topicId, { title, link });
    onHide();
  };
  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj Materiał</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Nazwa materiału</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nazwa materiału"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="link" className="mt-3">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Link do materiału"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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

export default AddMaterialFormModal;

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

interface StudyPlanFormProps {
  initialValues?: {
    title: string;
    description: string;
    category: string;
    startDate: string;
    endDate: string;
    isPublic: boolean;
  };
  onSubmit: (data: any) => void;
  submitButtonLabel: string;
}

const StudyPlanForm: React.FC<StudyPlanFormProps> = ({ initialValues, onSubmit, submitButtonLabel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (initialValues) {
        setTitle(initialValues.title || '');
        setDescription(initialValues.description || '');
        setCategory(initialValues.category || '');
        setStartDate(initialValues.startDate  ? new Date(initialValues.startDate).toISOString().split('T')[0] : '');
        setEndDate(initialValues.endDate ? new Date(initialValues.endDate).toISOString().split('T')[0] : '');
        setIsPublic(initialValues.isPublic || false);
      }
    }, [initialValues]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ title, description, category, startDate, endDate, isPublic });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} className="bg-light p-4 rounded">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Nazwa planu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwa planu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category" className="mt-3">
              <Form.Label>Przedmiot/Kategoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Przedmiot/Kategoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Row className="mt-3">
              <Col>
                <Form.Group controlId="startDate">
                  <Form.Label>Data startowa</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="endDate">
                  <Form.Label>Data końcowa</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="isPublic" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Publiczny"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            </Form.Group>

            <Button variant="warning" type="submit" className="mt-4">
              {submitButtonLabel}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StudyPlanForm;

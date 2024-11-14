import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

interface GenerateScheduleFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (formData: ScheduleFormData) => void;
}

interface ScheduleFormData {
  sessionsPerDay: number;
  sessionLength: number;
  studyStartTime: string;
  studyEndTime: string;
  preferredStudyDays: string[];
}

const GenerateScheduleFormModal: React.FC<GenerateScheduleFormModalProps> = ({show,onHide,onSubmit,}) => {
  const [sessionsPerDay, setSessionsPerDay] = useState("1");
  const [sessionLength, setSessionLength] = useState("1");
  const [studyStartTime, setStudyStartTime] = useState("18:00");
  const [studyEndTime, setStudyEndTime] = useState("21:00");
  const [preferredStudyDays, setPreferredStudyDays] = useState<string[]>([]);

  const handleStudyDaysChange = (day: string) => {
    setPreferredStudyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Convert study times to valid time format (HH:mm:ss)
    const formattedStartTime = `${studyStartTime}:00`; 
    const formattedEndTime = `${studyEndTime}:00`;
  
    onSubmit({
      sessionsPerDay: parseInt(sessionsPerDay),
      sessionLength: parseInt(sessionLength),
      studyStartTime: formattedStartTime, // Time format as a string
      studyEndTime: formattedEndTime,     // Time format as a string
      preferredStudyDays, 
    });
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Wygeneruj harmonogram
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="sessionsPerDay">
            <Form.Label>Liczba sesji dziennie</Form.Label>
            <Form.Control
              type="number"
              placeholder="Podaj liczbę sesji dziennie"
              value={sessionsPerDay}
              onChange={(e) => setSessionsPerDay(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="sessionLength" className="mt-3">
            <Form.Label>Długość jednej sesji (w godzinach)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Podaj długość jednej sesji (w godzinach)"
              value={sessionLength}
              onChange={(e) => setSessionLength(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <Form.Group controlId="studyStartTime">
                <Form.Label>Początek okna nauki (godzina)</Form.Label>
                <Form.Control
                  type="time"
                  value={studyStartTime}
                  onChange={(e) => setStudyStartTime(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="studyEndTime">
                <Form.Label>Koniec okna nauki (godzina)</Form.Label>
                <Form.Control
                  type="time"
                  value={studyEndTime}
                  onChange={(e) => setStudyEndTime(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="preferredStudyDays" className="mt-3">
            <Form.Label>Preferowane dni nauki</Form.Label>
            <div className="d-flex flex-wrap">
              {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
                <Form.Check
                  key={day}
                  inline
                  label={day}
                  type="checkbox"
                  checked={preferredStudyDays.includes(day)}
                  onChange={() => handleStudyDaysChange(day)}
                />
              ))}
            </div>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Zamknij
            </Button>
            <Button variant="primary" type="submit">
              Zapisz harmonogram
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateScheduleFormModal;

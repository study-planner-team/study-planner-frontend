import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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

const GenerateScheduleFormModal: React.FC<GenerateScheduleFormModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const { t } = useTranslation("global");

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

    const today = new Date();
    const startDateTime = new Date(
      `${today.toISOString().split("T")[0]}T${studyStartTime}:00`
    );
    const endDateTime = new Date(
      `${today.toISOString().split("T")[0]}T${studyEndTime}:00`
    );

    const utcStartTime = startDateTime.toISOString();
    const utcEndTime = endDateTime.toISOString();

    onSubmit({
      sessionsPerDay: parseInt(sessionsPerDay),
      sessionLength: parseInt(sessionLength),
      studyStartTime: utcStartTime,
      studyEndTime: utcEndTime,
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
          {t("schedule.generateSchedule")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="sessionsPerDay">
            <Form.Label>{t("schedule.sessionsPerDay")}</Form.Label>
            <Form.Control
              type="number"
              placeholder={t("schedule.sessionsPerDayPlaceholder")}
              value={sessionsPerDay}
              onChange={(e) => setSessionsPerDay(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="sessionLength" className="mt-3">
            <Form.Label>{t("schedule.sessionLength")}</Form.Label>
            <Form.Control
              type="number"
              placeholder={t("schedule.sessionLengthPlaceholder")}
              value={sessionLength}
              onChange={(e) => setSessionLength(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <Form.Group controlId="studyStartTime">
                <Form.Label>{t("schedule.startTime")}</Form.Label>
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
                <Form.Label>{t("schedule.endTime")}</Form.Label>
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
            <Form.Label>{t("schedule.preferredStudyDays")}</Form.Label>
            <div className="d-flex flex-wrap">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <Form.Check
                  key={day}
                  inline
                  label={t(`days.${day.toLowerCase()}`)}
                  type="checkbox"
                  checked={preferredStudyDays.includes(day)}
                  onChange={() => handleStudyDaysChange(day)}
                />
              ))}
            </div>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              {t("common.close")}
            </Button>
            <Button variant="primary" type="submit">
              {t("schedule.saveSchedule")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateScheduleFormModal;

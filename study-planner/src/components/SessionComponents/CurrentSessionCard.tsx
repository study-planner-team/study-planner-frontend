import React, { useEffect, useState } from "react";
import { Card, Button, Container, ListGroup } from "react-bootstrap";
import {
  calculateTimeLeft,
  formatDate,
  formatTime,
} from "../../utils/dateTimeUtils";
import { useActiveSessionContext } from "../../context/ActiveSessionProvider";

const CurrentSessionCard: React.FC = ({}) => {
  const {
    activeSession: session,
    startSession,
    endSession,
  } = useActiveSessionContext();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (session?.status === "InProgress") {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(session.date, session.endTime));
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [session]);

  if (!session) {
    return (
      <>
        <Container className="text-center my-5">
          <h3>Brak aktywnej sesji nauki</h3>
        </Container>
      </>
    );
  }

  return (
    <Card className="shadow-lg">
      <Card.Body>
        <Card.Title className="text-center text-primary mb-4">
          Aktywna Sesja: {session.studyTopic.title}
        </Card.Title>
        <Card.Text className="text-center">
          <strong>Data:</strong> {formatDate(session.date)} <br />
          <strong>Start:</strong> {formatTime(session.date, session.startTime)}{" "}
          <br />
          <strong>Koniec:</strong> {formatTime(session.date, session.endTime)}{" "}
          <br />
          <strong>Czas trwania:</strong> {session.duration} minut
        </Card.Text>
        <div className="text-center my-4">
          <h2 className="text-info">
            {timeLeft || "Start the session to see the timer!"}
          </h2>
        </div>
        <h4 className="text-center mt-4">Materiały do nauki:</h4>
        <ListGroup variant="flush" className="text-center">
          {session.studyTopic.studyMaterials.map((material) => (
            <ListGroup.Item
              key={material.studyMaterialId}
              className="d-flex justify-content-center"
            >
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {material.title}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="text-center mt-4">
          {session.status === "NotStarted" && (
            <Button onClick={startSession}>Start Session</Button>
          )}
          {session.status === "InProgress" && (
            <Button variant="danger" onClick={endSession}>
              End Session
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentSessionCard;

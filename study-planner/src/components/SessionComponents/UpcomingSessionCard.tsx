import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { formatDate, formatTime } from "../../utils/dateTimeUtils";
import ScheduleService from "../../services/ScheduleService";

const UpcomingSessionCard: React.FC = ({}) => {
  const [session, setSession] = useState<any>();

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const data = await ScheduleService.getUpcomingSession();
    if (data) {
      setSession(data);
    }
  };

  if (!session) {
    return (
      <>
        <Container className="text-center my-5">
          <h3>Brak nadchodzącej sesji nauki</h3>
        </Container>
      </>
    );
  }

  return (
    <Card className="shadow-lg">
      <Card.Body>
        <Card.Title className="text-center text-primary mb-4">
          {session.studyTopic.title}
        </Card.Title>
        <Card.Text className="text-center">
          <strong>Data:</strong> {formatDate(session.date)} <br />
          <strong>Start:</strong> {formatTime(session.date, session.startTime)}{" "}
          <br />
          <strong>Koniec:</strong> {formatTime(session.date, session.endTime)}{" "}
          <br />
          <strong>Czas trwania:</strong> {session.duration} minut
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UpcomingSessionCard;

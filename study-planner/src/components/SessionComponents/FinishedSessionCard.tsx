import React from "react";
import { Card, Button } from "react-bootstrap";
import { formatDate, formatDuration, formatTime } from "../../utils/dateTimeUtils";

interface FinishedSessionProps {
  session: any;
}

const FinishedSessionCard: React.FC<FinishedSessionProps> = ({ session }) => {
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
          <strong>Czas trwania:</strong> {formatDuration(session.actualDuration)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FinishedSessionCard;

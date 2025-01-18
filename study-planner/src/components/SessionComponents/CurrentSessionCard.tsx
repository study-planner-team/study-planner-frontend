import React, { useEffect, useState } from "react";
import { Card, Button, Container, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import {
  calculateTimeLeft,
  formatDate,
  formatTime,
} from "../../utils/dateTimeUtils";
import { useActiveSessionContext } from "../../context/ActiveSessionProvider";

const CurrentSessionCard: React.FC = () => {
  const { t } = useTranslation("global");
  const { activeSession: session, startSession, endSession } =
    useActiveSessionContext();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    console.log(session?.studyTopic.studyMaterials)
    if (session?.status === "InProgress") {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(session.date, session.endTime));
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [session]);

  if (!session) {
    return (
      <Container className="text-center my-5">
        <h3>{t("session.noActiveSession")}</h3>
      </Container>
    );
  }

  return (
    <Card className="shadow-lg">
      <Card.Body>
        <Card.Title className="text-center text-primary mb-4">
          {t("session.activeSession")}: {session.studyTopic.title}
        </Card.Title>
        <Card.Text className="text-center">
          <strong>{t("session.date")}:</strong> {formatDate(session.date)} <br />
          <strong>{t("session.start")}:</strong>{" "}
          {formatTime(session.date, session.startTime)} <br />
          <strong>{t("session.end")}:</strong>{" "}
          {formatTime(session.date, session.endTime)} <br />
          <strong>{t("session.duration")}:</strong> {session.duration}{" "}
          {t("session.minutes")}
        </Card.Text>
        <div className="text-center my-4">
          <h2 className="text-info">
            {timeLeft || t("session.startToSeeTimer")}
          </h2>
        </div>
        <h4 className="text-center mt-4">{t("session.studyMaterials")}:</h4>
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
            <Button onClick={startSession}>{t("session.startSession")}</Button>
          )}
          {session.status === "InProgress" && (
            <Button variant="danger" onClick={endSession}>
              {t("session.endSession")}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentSessionCard;

import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import { formatDate, formatTime } from "../../utils/dateTimeUtils";
import ScheduleService from "../../services/ScheduleService";

const UpcomingSessionCard: React.FC = () => {
  const { t } = useTranslation("global");
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
      <Container className="text-center my-5">
        <h3>{t("session.noUpcomingSession")}</h3>
      </Container>
    );
  }

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="text-center text-primary mb-4">
          {session.studyTopic.title}
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
      </Card.Body>
    </Card>
  );
};

export default UpcomingSessionCard;

import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import { formatDate, formatDuration, formatTime } from "../../utils/dateTimeUtils";

interface FinishedSessionProps {
  session: any;
}

const FinishedSessionCard: React.FC<FinishedSessionProps> = ({ session }) => {
  const { t } = useTranslation("global");

  return (
    <Card className="shadow-lg">
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
          <strong>{t("session.duration")}:</strong>{" "}
          {formatDuration(session.actualDuration)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FinishedSessionCard;

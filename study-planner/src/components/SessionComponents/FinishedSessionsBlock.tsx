import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import translations
import ScheduleService from "../../services/ScheduleService";
import FinishedSessionCard from "./FinishedSessionCard";
import { Container } from "react-bootstrap";

const FinishedSessionBlock: React.FC = () => {
  const { t } = useTranslation("global");
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const data = await ScheduleService.getFinishedSessions();
    if (data) {
      setSessions(data);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>{t("session.loadingSessions")}</p>;
  }

  return (
    <ul className="list-unstyled">
      {sessions.length > 0 ? (
        sessions.map((sessionData, index) => (
          <FinishedSessionCard key={index} session={sessionData} />
        ))
      ) : (
        <Container className="text-center my-5">
        <h3>{t("session.noFinishedSessions")}</h3>
        </Container>
      )}
    </ul>
  );
};

export default FinishedSessionBlock;

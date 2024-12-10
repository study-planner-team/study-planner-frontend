import React, { useEffect, useState } from "react";
import ScheduleService from "../../services/ScheduleService";
import FinishedSessionCard from "./FinishedSessionCard";

const FinishedSessionBlock: React.FC = ({}) => {
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
    return <p>Ładowanie sesji...</p>;
  }
  
  return (
    <>
      <ul className="list-unstyled">
        {sessions.length > 0 ? (
          sessions.map((sessionData, index) => (
            <FinishedSessionCard key={index} session={sessionData} />
          ))
        ) : (
          <p>Brak zakończonych sesji.</p>
        )}
      </ul>
    </>
  );
};

export default FinishedSessionBlock;

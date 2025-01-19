import React from "react";
import { useTranslation } from "react-i18next"; // Import translations

interface Topic {
  title: string;
  hours: number;
}

interface Schedule {
  studySessionId: number;
  date: Date;
  duration: number;
  topicTitle: string;
  startTime: Date;
  endTime: Date;
  studyPlanId: number;
  userId: number;
  studyTopic: Topic;
}

interface ScheduleProps {
  data: Schedule;
}

const ScheduleBlock: React.FC<ScheduleProps> = ({ data }) => {
  const { t } = useTranslation("global");

  return (
    <div>
      <h2>{data.studyTopic.title}</h2>
      <p className="fw-bold">
        {t("schedule.date")}: {data.date.toLocaleString()}
      </p>
      <p className="fw-bold">
        {t("schedule.duration")}: {data.duration.toString()} {t("schedule.hours")}
      </p>
      <p className="fw-bold">
        {t("schedule.startTime")}: {data.startTime.toLocaleString()}
      </p>
      <p className="fw-bold">
        {t("schedule.endTime")}: {data.endTime.toLocaleString()}
      </p>
    </div>
  );
};

export default ScheduleBlock;

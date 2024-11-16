import { useEffect, useState } from "react";
import ScheduleService from "../services/ScheduleService";
import moment from "moment";

interface StudySession {
  studySessionId: number;
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
  studyPlanId: number | null;
  studyTopic: Topic;
}

interface Topic {
  topicId: number;
  title: string;
  hours: number;
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource?: {
    studySessionId: number;
    duration: number;
    studyPlanId: number | null;
    studyTopic: Topic;
  };
}

export const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const schedules: StudySession[] = await ScheduleService.getSchedules();
    if (schedules) {
      const transformedEvents = transformStudySessionsToEvents(schedules);
      setEvents(transformedEvents);
    }
  };

  const transformStudySessionsToEvents = (studySessions: StudySession[]): CalendarEvent[] => {
    return studySessions.map((session) => {
      const start = moment(`${session.date} ${session.startTime}`, "YYYY-MM-DD HH:mm:ss").toDate();
      const end = moment(`${session.date} ${session.endTime}`, "YYYY-MM-DD HH:mm:ss").toDate();
      const formattedStartTime = moment(start).format("HH:mm");
      const formattedEndTime = moment(end).format("HH:mm");

      return {
        title: `${session.studyTopic.title} (${formattedStartTime} - ${formattedEndTime})`,
        start,
        end,
        resource: {
          studySessionId: session.studySessionId,
          duration: session.duration,
          studyPlanId: session.studyPlanId,
          studyTopic: session.studyTopic,
        },
      };
    });
  };
  
  return {
    events
  };
};

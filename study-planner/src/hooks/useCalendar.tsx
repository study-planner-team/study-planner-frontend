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

      // Convert UTC session times to local time
      const start = new Date(`${session.date.split('T')[0]}T${session.startTime}Z`);
      const end = new Date(`${session.date.split('T')[0]}T${session.endTime}Z`);

      // Format start and end times to local time
      const formattedStartTime = start.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
      const formattedEndTime = end.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });

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
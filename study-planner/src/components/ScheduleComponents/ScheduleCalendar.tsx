import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../../styles/CalendarStyles.css';
import {useCalendar} from '../../hooks/useCalendar';

moment.updateLocale("pl", {
  week: {
    dow: 1, // Start the week on Monday instead of Sunday
  },
});

const localizer = momentLocalizer(moment);

const ScheduleCalendar: React.FC = () => {
  const {events} = useCalendar();

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "day", "agenda"]}
        style={{ height: "100%" }}
        className="my-calendar"
      />
    </div>
  );
};

export default ScheduleCalendar;

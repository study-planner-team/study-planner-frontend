import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/CalendarStyles.css";
import { useCalendar } from "../../hooks/useCalendar";
import { useTranslation } from "react-i18next";

const languageMap: Record<string, string> = {
  eng: "en",
  pol: "pl",
};

moment.updateLocale("en", {
  week: {
    dow: 1, 
  },
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
});

moment.updateLocale("pl", {
  week: {
    dow: 1, // Start the week on Monday
  },
  weekdaysShort: ["Nie", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"],
  weekdays: ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],
  months: ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],
  monthsShort: ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"]
});

const localizer = momentLocalizer(moment);

const ScheduleCalendar: React.FC = () => {
  const { events } = useCalendar();
  const { i18n, t } = useTranslation("global");
  const [mappedLanguage, setMappedLanguage] = useState(() => languageMap[i18n.language] || "en");

  useEffect(() => {
    const newMappedLanguage = languageMap[i18n.language] || "en";
    setMappedLanguage(newMappedLanguage);
    moment.locale(newMappedLanguage);
  }, [i18n.language]);

  const format = i18n.language === "pol" ? "HH:mm" : "h:mm a";
  const formats = {
    eventTimeRangeFormat: () => '',
    timeGutterFormat: (date: Date, culture?: string, localizer?: any) => {
      return localizer ? localizer.format(date, format, culture || "en") : moment(date).format(format);
    },
    agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
      return `${moment(start).format(format)} – ${moment(end).format(format)}`;
    },
    dayFormat: "ddd, D MMM",
    monthHeaderFormat: (date: Date) => moment(date).format("MMMM YYYY"),
    dayHeaderFormat: (date: Date) => moment(date).format("dddd, D MMMM YYYY"),
  };

  const messages = {
    today: t("calendar.today"),
    previous: t("calendar.previous"),
    next: t("calendar.next"),
    month: t("calendar.month"),
    week: t("calendar.week"),
    day: t("calendar.day"),
    agenda: t("calendar.agenda"),
    date: t("calendar.date"),
    time: t("calendar.time"),
    event: t("calendar.event"),
    allDay: t("calendar.allDay"),
    noEventsInRange: t("calendar.noEventsInRange"),
  };

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
        formats={formats}
        messages={messages}
      />
    </div>
  );
};

export default ScheduleCalendar;
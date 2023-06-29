import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours, format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

import { Navbar } from "../";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Cumpleaños del jefe",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: "#fafafa",
    notes: "Comprar el pastel",
    user: {
      _id: "123",
      name: "Matias",
    },
  },
];

export const CalendarPage = () => {
  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </>
  );
};

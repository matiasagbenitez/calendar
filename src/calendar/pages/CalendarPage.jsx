import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { localizer, calendarMessagesES } from "../../helpers";
import { useState } from "react";

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

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };

  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
  };
  
  const onSelect = (event) => {
    console.log({click: event});
  };
  
  const onViewChanged = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        view={lastView}     // "month", "week", "day", "agenda"
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={calendarMessagesES()}
        eventPropGetter={(eventStyleGetter)}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  );
};

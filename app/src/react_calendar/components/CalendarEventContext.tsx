import React, { useState, useContext, createContext } from 'react';

export type CalendarEventType = {
  clickedBefore: boolean;
  setClickedBefore: (arg1: boolean) => void;
  clickedNext: boolean;
  setClickedNext: (arg1: boolean) => void;
  clickedCurrent: boolean;
  setClickedCurrent: (arg1: boolean) => void;
}

export const CalendarEventContext = createContext({
  clickedBefore: false,
  setClickedBefore: (arg1: boolean) => {},
  clickedNext: false,
  setClickedNext: (arg1: boolean) => {},
  clickedCurrent: false,
  setClickedCurrent: (arg1: boolean) => {},
});

const CalendarEventContextProvider = (props: { children?: React.ReactNode }) => {
  const [clickedBefore, setClickedBefore] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  const [clickedCurrent, setClickedCurrent] = useState(false);

  const calendarEventState: CalendarEventType = {
    clickedBefore: clickedBefore,
    setClickedBefore: setClickedBefore,
    clickedNext: clickedNext,
    setClickedNext: setClickedNext,
    clickedCurrent: clickedCurrent,
    setClickedCurrent: setClickedCurrent,
  }

  return (
    <CalendarEventContext.Provider value={calendarEventState}>
      {props.children}
    </CalendarEventContext.Provider>
  );
}

const GetCalendarEventState = (): CalendarEventType => {
  return useContext(CalendarEventContext);
}

export { CalendarEventContextProvider, GetCalendarEventState }


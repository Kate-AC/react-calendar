import React, { useState, useContext, createContext } from 'react';
import RcDate from '../RcDate';

export type CurrentRcDateType = {
  currentRcDate: RcDate;
  setCurrentRcDate: (arg1: RcDate) => void;
}

export const CurrentRcDateContext = createContext({
  currentRcDate: new RcDate(),
  setCurrentRcDate: (arg1: RcDate) => {},
});

type Props = {
  children?: React.ReactNode;
}

const CurrentRcDateContextProvider = (props: Props) => {
  const [currentRcDate, setCurrentRcDate] = useState(new RcDate());

  const currentRcDateState: CurrentRcDateType = {
    currentRcDate: currentRcDate,
    setCurrentRcDate: setCurrentRcDate,
  }

  return (
    <CurrentRcDateContext.Provider value={currentRcDateState}>
      {props.children}
    </CurrentRcDateContext.Provider>
  );
}

const GetCurrentRcDateState = (): CurrentRcDateType => {
  return useContext(CurrentRcDateContext);
}

export { CurrentRcDateContextProvider, GetCurrentRcDateState }


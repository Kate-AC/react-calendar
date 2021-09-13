import MonthlyFrame from './monthly/MonthlyFrame';
import WeeklyFrame from './weekly/WeeklyFrame';
import { CurrentRcDateContextProvider } from './CurrentRcDateContext';
import { CalendarEventContextProvider } from './CalendarEventContext';

const ReactCalendar: React.FC = () => (
  <CalendarEventContextProvider>
    <CurrentRcDateContextProvider>
      <WeeklyFrame />
    </CurrentRcDateContextProvider>
  </CalendarEventContextProvider>
);

export default ReactCalendar;

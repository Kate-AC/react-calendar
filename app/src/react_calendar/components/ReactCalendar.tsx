import MonthlyFrame from './monthly/MonthlyFrame';
import { CurrentRcDateContextProvider } from './CurrentRcDateContext';

const ReactCalendar: React.FC = () => (
  <CurrentRcDateContextProvider>
    <MonthlyFrame />
  </CurrentRcDateContextProvider>
);

export default ReactCalendar;

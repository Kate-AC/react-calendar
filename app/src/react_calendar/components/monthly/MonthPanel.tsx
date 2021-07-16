import RcDate from '../../RcDate';
import styled from 'styled-components';
import DateItem from './DateItem';
import { rcConf } from '../../calendarConfig';
import { DayContents } from '../../DayContents';

const MonthPanelStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(${rcConf.dateWidth} * 7 + 8px);
  min-width: calc(${rcConf.dateWidth} * 7 + 8px);
  margin: 0 10px;

  .date-item:not(:nth-child(7n)) {
    border-right: none !important;
  }

  .date-item:nth-child(-n+28) {
    border-bottom: none !important;
  }
`;

const MonthPanel = (props: { days: DayContents[] }) => {
  const { days } = props;

  return (
    <MonthPanelStyled>
      {
        days.map((item: DayContents) => <DateItem dayContents={item} /> )
      }
    </MonthPanelStyled>
  );
};

export default MonthPanel;

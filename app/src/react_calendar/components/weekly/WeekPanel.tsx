import RcDate from '../../RcDate';
import styled from 'styled-components';
import { rcConf } from '../../calendarConfig';
import { DayContents } from '../../DayContents';
import OneDayPanel from './OneDayPanel';

const WeekPanelStyled = styled.div`
  display: flex;
`;

const WeekPanel = () => {
  const fuga = Array(7);
  fuga.fill(0);

  return (
    <WeekPanelStyled>
      {
        fuga.map(item => <OneDayPanel />)
      }
    </WeekPanelStyled>
  );
};

export default WeekPanel;

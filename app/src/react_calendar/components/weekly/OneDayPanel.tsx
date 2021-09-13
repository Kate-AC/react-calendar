import RcDate from '../../RcDate';
import styled from 'styled-components';
import { rcConf } from '../../calendarConfig';
import HourItem from './HourItem';

const OneDayPanelStyled = styled.div`
`;

const OneDayPanel = () => {
  const hoge = Array(24);
  hoge.fill(0);

  return (
    <OneDayPanelStyled className="one-day-panel">
      {
        hoge.map(item => <HourItem />)
      }
    </OneDayPanelStyled>
  );
};

export default OneDayPanel;

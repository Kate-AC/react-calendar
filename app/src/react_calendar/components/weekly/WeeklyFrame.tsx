import WeekPanelList from './WeekPanelList';
import WeeklyHeader from './WeeklyHeader';
import styled from 'styled-components';

const WeeklyFrameStyled = styled.div`
`;

const WeeklyFrame: React.FC = () => {
  return (
    <WeeklyFrameStyled>
      <WeeklyHeader />
      <WeekPanelList />
    </WeeklyFrameStyled>
  );
}

export default WeeklyFrame;

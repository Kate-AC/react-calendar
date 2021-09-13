import MonthPanelList from './MonthPanelList';
import MonthlyHeader from './MonthlyHeader';
import styled from 'styled-components';
import { useState } from 'react';

const MonthlyFrameStyled = styled.div`
`;

const MonthlyFrame: React.FC = () => {
  return (
    <MonthlyFrameStyled>
      <MonthlyHeader />
      <MonthPanelList />
    </MonthlyFrameStyled>
  );
}

export default MonthlyFrame;

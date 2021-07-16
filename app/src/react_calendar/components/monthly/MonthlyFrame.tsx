import MonthPanelList from './MonthPanelList';
import MonthlyHeader from './MonthlyHeader';
import styled from 'styled-components';
import { useState } from 'react';

const MonthlyFrameStyled = styled.div`
`;

type ClickedStates = {
  clickedBefore: boolean;
  setClickedBefore: (arg1: boolean) => void;
  clickedNext: boolean;
  setClickedNext: (arg1: boolean) => void;
}

const MonthlyFrame: React.FC = () => {
  const [clickedBefore, setClickedBefore] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);

  const clickedStates: ClickedStates = {
    clickedBefore: clickedBefore,
    setClickedBefore: setClickedBefore,
    clickedNext: clickedNext,
    setClickedNext: setClickedNext,
  }

  return (
    <MonthlyFrameStyled>
      <MonthlyHeader clickedStates={clickedStates} />
      <MonthPanelList clickedStates={clickedStates} />
    </MonthlyFrameStyled>
  );
}

export default MonthlyFrame;
export type { ClickedStates }

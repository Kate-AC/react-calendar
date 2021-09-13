import RcDate from '../../RcDate';
import styled from 'styled-components';
import MinuteItem from './MinuteItem';

const HourItemStyled = styled.div`
`;

const HourItem = () => {
  const fuga = Array(4);
  fuga.fill(0);

  return (
    <HourItemStyled className="hour-item">
      {
        fuga.map(item => <MinuteItem />)
      }
    </HourItemStyled>
  );
};

export default HourItem;

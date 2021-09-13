import RcDate from '../../RcDate';
import styled from 'styled-components';
import { rcConf } from '../../calendarConfig';

const MinuteItemStyled = styled.div`
  cursor: pointer;
  height: 10px;
  width: 50px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    color: #fff;
    background-color: #ff75a1;
  }
`;

const MinuteItem = () => {
  return (
    <MinuteItemStyled className="minute-item">
    </MinuteItemStyled>
  );
};

export default MinuteItem;

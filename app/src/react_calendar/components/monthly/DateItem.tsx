import styled from 'styled-components';
import { rcConf } from '../../calendarConfig';
import { DayContents } from '../../DayContents';
import { GetCurrentRcDateState } from '../CurrentRcDateContext';
import { useEffect } from 'react';

const DateItemStyled = styled.div`
  border: 1px solid #000;
  width: ${rcConf.dateWidth};
  height ${rcConf.dateHeight};
  font-size: ${rcConf.dateFontSize};
  cursor: pointer;

  .date-item {
    &__container {
      height: 100%;
      width: 100%;
      transition: all 0.3s;

      &.current {
      }

      &.other {
        opacity: 0.2;
      }

      &.sunday {
        color: ${rcConf.sundayColor};
      }

      &.saturday {
        color: ${rcConf.saturdayColor};
      }

      &.holiday {
        color: ${rcConf.holidayColor};
      }

      &:hover {
        color: #fff;
        background-color: #ff75a1;
      }

      &--header {
        padding: 5px;
      }
    }
  } 
`;

const currentEvent = (dayContents: any) => {
  console.log(dayContents)
}

const DateItem = (props: { dayContents: any }) => {
  const { dayContents } = props;
  const { currentRcDate, setCurrentRcDate } = GetCurrentRcDateState();

  return (
    <DateItemStyled className="date-item">
      <div
        className={
          [
            "date-item__container",
            dayContents.class,
            dayContents.isCurrent ? "current" : "other",
            // currentRcDate.month() === dayContents.rcDate.month() ? "current" : "other",
          ].join(" ")
        }
        onClick={() => currentEvent(dayContents)}
      >
        <div className="date-item__container--header">
          { dayContents.rcDate.date() }
        </div>
      </div>
    </DateItemStyled>
  );
};

export default DateItem;

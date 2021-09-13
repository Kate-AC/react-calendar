import DateComputer from '../../DateComputer';
import WeekPanel from './WeekPanel';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GetCurrentRcDateState } from '../CurrentRcDateContext';
import { GetCalendarEventState } from '../CalendarEventContext';
import { rcConf } from '../../calendarConfig';

// (幅 + 線1px) * 7 + 1px
const WeekPanelListStyled = styled.div`
  .week-panel-list {
    width: calc(${rcConf.daysWidth} + 20px);
    height: calc(${rcConf.daysHeight});
    overflow-x: hidden;
    overflow-y: scroll;

    &__container {
      top: 0;
      position: relative;

      &--before,
      &--current,
      &--next {
        top: 0;
        position: absolute;
        background-color: #fff;
      }

      &--before {
        left: calc((${rcConf.daysWidth}) * -1 - 20px);
      }

      &--current {
      }

      &--next {
        left: calc((${rcConf.daysWidth}) * 1 + 20px);
      }
    }
  }

  .week {
    &-current {
      animation-name: month-current;
      animation-duration: 0.3s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
    }

    &-before {
      animation-name: month-before;
      animation-duration: 0.3s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
    }

    &-next {
      animation-name: month-next;
      animation-duration: 0.3s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
    }
  }

  @keyframes week-current {
    0% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes week-before {
    0% {
      left: -50px;
      opacity: 0;
    }
    60% {
      left: -50px;
      opacity: 0;
    }
    90% {
      opacity: 1;
      left: 0;
    }
    100% {
      opacity: 1;
      left: 0;
    }
  }

  @keyframes week-next {
    0% {
      left: 50px;
      opacity: 0;
    }
    60% {
      left: 50px;
      opacity: 0;
    }
    90% {
      opacity: 1;
      left: 0;
    }
    100% {
      opacity: 1;
      left: 0;
    }
  }

  .one-day-panel {
    .hour-item {
      border: solid 1px #000;

      .minute-item:not(:last-child) {
        border-bottom: 1px dotted #ddd;
      }

      &:not(:last-child) {
        border-bottom: none;
      }
    }

    &:not(:last-child) {
      .hour-item {
        border-right: none;
      }
    }
  }
`;

const WeekPanelList = () => {
  const { currentRcDate } = GetCurrentRcDateState();
  const { clickedBefore, clickedNext, clickedCurrent } = GetCalendarEventState();
  const [calendarBase, setCalendarBase] = useState(
    DateComputer.buildCalendarBase(currentRcDate.toDate())
  );

  console.log(DateComputer.getDaysCurrentWeek(currentRcDate.toDate()));

  useEffect(() => {
    setCalendarBase(
      DateComputer.buildCalendarBase(currentRcDate.toDate())
    );
  }, [currentRcDate]);

  return (
    <WeekPanelListStyled>
      <div className="week-panel-list">
        <div className="week-panel-list__container">
          <WeekPanel />
        </div>
      </div>
    </WeekPanelListStyled>
  );
};

export default WeekPanelList;

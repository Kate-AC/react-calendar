import DateComputer from '../../DateComputer';
import MonthPanel from './MonthPanel';
import DateItem from './DateItem';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GetCurrentRcDateState } from '../CurrentRcDateContext';
import { GetCalendarEventState } from '../CalendarEventContext';
import { rcConf } from '../../calendarConfig';

// (幅 + 線1px) * 7 + 1px
const MonthPanelListStyled = styled.div`
  .month-panel-list {
    width: calc(${rcConf.daysWidth} + 20px);
    height: calc(${rcConf.daysHeight});
    overflow: hidden;

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

  .month {
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

  @keyframes month-current {
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

  @keyframes month-before {
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

  @keyframes month-next {
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
`;

const MonthPanelList = () => {
  const { currentRcDate } = GetCurrentRcDateState();
  const { clickedBefore, clickedNext, clickedCurrent } = GetCalendarEventState();
  const [calendarBase, setCalendarBase] = useState(
    DateComputer.buildCalendarBase(currentRcDate.toDate())
  );

  useEffect(() => {
    setCalendarBase(
      DateComputer.buildCalendarBase(currentRcDate.toDate())
    );
  }, [currentRcDate]);

  return (
    <MonthPanelListStyled>
      <div className="month-panel-list">
        <div className="month-panel-list__container">
          <div className={[
            "month-panel-list__container--before",
            clickedBefore ? 'month-before' : ''
          ].join(" ")}>
            <MonthPanel days={calendarBase.beforeMonth} />
          </div>

          <div className={[
            "month-panel-list__container--current",
            clickedCurrent ? 'month-current' : ''
          ].join(" ")}>
            <MonthPanel days={calendarBase.currentMonth} />
          </div>

          <div className={[
            "month-panel-list__container--next",
            clickedNext ? 'month-next' : ''
          ].join(" ")}>
            <MonthPanel days={calendarBase.nextMonth} />
          </div>
        </div>
      </div>
    </MonthPanelListStyled>
  );
};

export default MonthPanelList;

import DateComputer from '../../DateComputer';
import MonthPanel from './MonthPanel';
import DateItem from './DateItem';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GetCurrentRcDateState } from '../CurrentRcDateContext';
import { rcConf } from '../../calendarConfig';
import { ClickedStates } from './MonthlyFrame';

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

  .before {
    animation-name: before;
    animation-duration: 0.3s;
    animation-timing-function: ease;
  }

  .current {
    animation-name: current;
    animation-duration: 0.3s;
    animation-timing-function: ease;
  }

  .next {
    animation-name: next;
    animation-duration: 0.3s;
    animation-timing-function: ease;
  }

  @keyframes before {
    0% {
      left: -10px;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      left: 0;
    }
  }

  @keyframes current {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes next {
    0% {
      left: 10px;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      left: 0;
    }
  }
`;

const MonthPanelList = (props: { clickedStates: ClickedStates }) => {
  const { clickedStates } = props;
  const { currentRcDate } = GetCurrentRcDateState();
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
            clickedStates.clickedBefore ? 'before' : ''
          ].join(" ")}>
            <MonthPanel days={calendarBase.beforeMonth} />
          </div>

          <div className={[
            "month-panel-list__container--current",
            (clickedStates.clickedNext || clickedStates.clickedBefore) ? 'current' : ''
          ].join(" ")}>
            <MonthPanel days={calendarBase.currentMonth} />
          </div>

          <div className={[
            "month-panel-list__container--next",
            clickedStates.clickedNext ? 'next' : ''
          ].join(" ")}>
            <MonthPanel days={calendarBase.nextMonth} />
          </div>
        </div>
      </div>
    </MonthPanelListStyled>
  );
};

export default MonthPanelList;

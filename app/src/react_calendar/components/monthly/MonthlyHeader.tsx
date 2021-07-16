import RcDate from '../../RcDate';
import styled from 'styled-components';
import { rcConf } from '../../calendarConfig';
import { GetCurrentRcDateState } from '../CurrentRcDateContext';
import { ClickedStates } from './MonthlyFrame';

const MonthlyHeaderStyled = styled.div`
  .monthly-header {
    border: 1px solid #000;
    border-bottom: none;
    margin: 0 10px;
    width: calc(${rcConf.daysWidth} - 2px);

    &__date {
      color: #fff;
      background-color: #000;
      height: 30px;
      position: relative;
      width: 100%;

      &--year {
        position: absolute;
        font-size: 0.5rem;
        left: 5px;
        top: 8px;
      }

      &--month {
        position: absolute;
        font-size: 0.9rem;
        font-style: oblique;
        left: 0;
        right: 0;
        margin: auto;
        top: 4px;
        width: 1rem;
      }

      &--next,
      &--back {
        cursor: pointer;
        position: absolute;
        font-size: 0.6rem;
        left: 0;
        right: 0;
        margin: auto;
        top:7px;
        width: 1rem;
      }

      &--next {
        left: 120px;
      }

      &--back {
        left: -120px;
      }
    }

    &__days {
      height: 15px;
      line-height: 12px;
      white-space: nowrap;

      &--day {
        box-sizing: border-box;
        display: inline-block;
        font-size: ${rcConf.dateFontSize};
        padding-left: 3px;
        width: calc(${rcConf.dateWidth} + 1px);
      }
    }
  }
`;

const MonthlyHeader = (props: { clickedStates: ClickedStates }) => {
  const { clickedStates } = props;
  const { currentRcDate, setCurrentRcDate } = GetCurrentRcDateState();

  const back = () => {
    clickedStates.setClickedBefore(true);
    setTimeout(() => {
      setCurrentRcDate(currentRcDate.previousMonth());
      clickedStates.setClickedBefore(false);
    }, 300);
  }

  const next = () => {
    clickedStates.setClickedNext(true);
    setTimeout(() => {
      setCurrentRcDate(currentRcDate.nextMonth());
      clickedStates.setClickedNext(false);
    }, 300);
  }

  return (
    <MonthlyHeaderStyled>
      <div className="monthly-header">
        <div className="monthly-header__date">
          <span className="monthly-header__date--year">
            { currentRcDate.year() }
          </span>
          <span className="monthly-header__date--month">
            { currentRcDate.month() }
          </span>
          <span
            className="monthly-header__date--back"
            onClick={() => back()}
          >◀︎</span>
          <span
            className="monthly-header__date--next"
            onClick={() => next()}
          >▶︎</span>
        </div>
        <div className="monthly-header__days">
        {
          rcConf.daysText.map((day) => {
            return (
              <div className="monthly-header__days--day">
                {day}
              </div>
            );
          })
        }
        </div>
      </div>
    </MonthlyHeaderStyled>
  );
};

export default MonthlyHeader;

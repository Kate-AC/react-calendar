import RcDate, { RcDateInitType } from './RcDate';
import { DayContents } from './DayContents';
import { rcConf } from './calendarConfig';

type CalendarBase = {
  currentMonth: DayContents[];
  nextMonth: DayContents[];
  beforeMonth: DayContents[];
}

class DateComputer {
  static getDaysCurrentWeek(date: RcDateInitType): DayContents[] {
    let rcDate: RcDate = (new RcDate(date)).firstDayOfThisWeek();
    let days: DayContents[] = [];

    for (let i = 0; i < 7; i++) {
      days.push({
        events: [],
        rcDate: rcDate,
        class: rcDate.dayColor(),
        isCurrent: true,
      });

      rcDate = rcDate.clone().nextDay();
    }

    return days;
  }


  static calcDaysCurrentMonth(date: RcDateInitType): number {
    const rcDate = new RcDate(date);
    const start: RcDate = rcDate.clone().firstDayOfThisMonth();
    const end: RcDate = rcDate.clone().lastDayOfThisMonth();

    return  ((end.time() - start.time()) / 86400000) + 1;
  }

  static getDays(date: RcDateInitType): DayContents[] {
    const length = this.calcDaysCurrentMonth(date);
    const days: DayContents[] = [];
    const rcDate: RcDate = (new RcDate(date)).clone()
      .resetTime()
      .firstDayOfThisMonth()
      .previousDay();

    for (let i = 0; i < length; i++) {
      const nextRcDate = rcDate.nextDay();

      days.push({
        events: [],
        rcDate: nextRcDate,
        class: nextRcDate.dayColor(),
        isCurrent: true,
      });
    }

    return days;
  }

  static paddingDaysStartAndEnd(
    current: DayContents[],
    next: DayContents[],
    before: DayContents[]
  ): DayContents[] {
    const beforeDays = current[0].rcDate.day() === 0 ? [] : before.slice(current[0].rcDate.day() * -1);
    const nextDays = next.slice(0, 6 - current.slice(-1)[0].rcDate.day());

    return [
      ...beforeDays.map((item) => {
        return item;
      }),
      ...current,
      ...nextDays.map((item) => {
        return item;
      }),
    ];
  }

  static buildCalendar(rcDate: RcDate): DayContents[] {
    const currentMonth: DayContents[] = DateComputer.getDays(rcDate.toDate());
    const nextMonth: DayContents[]    = DateComputer.getDays(rcDate.clone().nextMonth().toDate());
    const beforeMonth: DayContents[]  = DateComputer.getDays(rcDate.clone().previousMonth().toDate());

    return DateComputer.paddingDaysStartAndEnd(
      currentMonth,
      nextMonth,
      beforeMonth,
    ).map((item) => {
      item.isCurrent = rcDate.month() === item.rcDate.month();
      return item;
    }).slice(0, 35); // 31日目がある場合にはみ出すのでトリミングする
  }

  static buildCalendarBase(date: RcDateInitType): CalendarBase {
    const paddedCurrentMonth = DateComputer.buildCalendar(new RcDate(date));
    const paddedNextMonth = DateComputer.buildCalendar((new RcDate(date)).nextMonth());
    const paddedBeforeMonth = DateComputer.buildCalendar((new RcDate(date)).previousMonth());

    return {
      currentMonth: paddedCurrentMonth,
      nextMonth: paddedNextMonth,
      beforeMonth: paddedBeforeMonth,
    }
  }
}

export default DateComputer;

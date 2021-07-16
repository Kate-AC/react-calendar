import RcDate, { RcDateInitType } from './RcDate';
import { DayContents } from './DayContents';
import { rcConf } from './calendarConfig';

type CalendarBase = {
  currentMonth: DayContents[];
  nextMonth: DayContents[];
  beforeMonth: DayContents[];
}

class DateComputer {
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

  static buildCalendarBase(data: RcDateInitType): CalendarBase {
    const rcDate: RcDate       = new RcDate(data);
    const next: RcDate         = rcDate.clone().nextMonth();
    const nextNext: RcDate     = rcDate.clone().nextMonth().nextMonth();
    const before: RcDate       = rcDate.clone().previousMonth();
    const beforeBefore: RcDate = rcDate.clone().previousMonth().previousMonth();

    const currentMonth: DayContents[]      = DateComputer.getDays(rcDate.toDate());
    const nextMonth: DayContents[]         = DateComputer.getDays(next.toDate());
    const beforeMonth: DayContents[]       = DateComputer.getDays(before.toDate());
    const nextNextMonth: DayContents[]     = DateComputer.getDays(nextNext.toDate());
    const beforeBeforeMonth: DayContents[] = DateComputer.getDays(beforeBefore.toDate());

    const paddedCurrentMonth = DateComputer.paddingDaysStartAndEnd(
      currentMonth,
      nextMonth,
      beforeMonth,
    ).map(item => {
      item.isCurrent = rcDate.month() === item.rcDate.month();
      return item;
    });

    const paddedNextMonth = DateComputer.paddingDaysStartAndEnd(
      nextMonth,
      nextNextMonth,
      currentMonth,
    ).map(item => {
      item.isCurrent = next.month() === item.rcDate.month();
      return item;
    });

    const paddedBeforeMonth = DateComputer.paddingDaysStartAndEnd(
      beforeMonth,
      currentMonth,
      nextNextMonth,
    ).map(item => {
      item.isCurrent = before.month() === item.rcDate.month();
      return item;
    });

    // 31日目がある場合にはみ出すのでトリミングする
    return {
      currentMonth: paddedCurrentMonth.slice(0, 35),
      nextMonth: paddedNextMonth.slice(0, 35),
      beforeMonth: paddedBeforeMonth.slice(0, 35),
    }
  }
}

export default DateComputer;

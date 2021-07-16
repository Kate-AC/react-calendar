import { rcConf } from './calendarConfig';

type RcDateInitType = Date | string;

class RcDate {
  private _date: Date = new Date();

  constructor(date?: RcDateInitType) {
    if (date !== undefined) {
      this.initDate(date);
    }
  }

  initDate(value: RcDateInitType): void {
    if (typeof (value) === "string" || value instanceof String) {
      const dateAndTime: string[] = value.split(' ');
      const date: string[] = dateAndTime[0].split('-');
      const time: string[] = dateAndTime[1].split(':');

      this._date = new Date(
        parseInt(date[0]),
        parseInt(date[1]) - 1,
        parseInt(date[2]),
        parseInt(time[0]),
        parseInt(time[1]),
        parseInt(time[2]),
      );
    }

    if (value instanceof Date) {
      this._date = value;
    }
  }

  toDate(): Date {
    return this._date;
  }

  toString(): string {
    const date: string = [
      this.year(),
      ('00' + (this.month())).slice(-2),
      ('00' + this.date()).slice(-2),
    ].join('-');

    const time: string = [
      ('00' + this.hour()).slice(-2),
      ('00' + this.minute()).slice(-2),
      ('00' + this.second()).slice(-2),
    ].join(':');

    return date + ' ' + time;
  }

  lastDayOfThisMonth(): RcDate {
    return this.setMonth(this.month() + 1).setDate(0);
  }

  firstDayOfThisMonth(): RcDate {
    return this.setDate(1);
  }

  nextDay(): RcDate {
    return this.setDate(this.date() + 1);
  }

  previousDay(): RcDate {
    return this.setDate(this.date() - 1);
  }

  nextMonth(): RcDate {
    return this.setMonth(this.month() + 1);
  }

  previousMonth(): RcDate {
    return this.setMonth(this.month() - 1);
  }

  nextYear(): RcDate {
    return this.setYear(this.year() + 1);
  }

  previousYear(): RcDate {
    return this.setYear(this.year() - 1);
  }

  clone(): RcDate {
    return new RcDate(this.toString());
  }

  year(): number {
    return this._date.getFullYear();
  }

  month(): number {
    return this._date.getMonth() + 1;
  }

  date(): number {
    return this._date.getDate();
  }

  hour(): number {
    return this._date.getHours();
  }

  minute(): number {
    return this._date.getMinutes();
  }

  second(): number {
    return this._date.getSeconds();
  }

  time(): number {
    return this._date.getTime();
  }

  resetTime(): RcDate {
    return this.setHour(0).setMinute(0).setSecond(0);
  }

  day(): number {
    return this._date.getDay();
  }

  dayText(): string {
    return rcConf.daysText[this._date.getDay()]
  }

  dayTextFull(): string {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    return days[this._date.getDay()]
  }

  dayColor(): string {
    switch (this.day()) {
      case 0:
        return 'sunday';
      case 6:
        return 'saturday';
    }

    return '';
  }

  sameMonth(rcDate: RcDate): boolean {
    return this.month() === rcDate.month();
  }

  setYear(year: number): RcDate {
    this._date.setFullYear(year);
    return this.clone();
  }

  setMonth(month: number): RcDate {
    this._date.setMonth(month - 1);
    return this.clone();
  }

  setDate(date: number): RcDate {
    this._date.setDate(date);
    return this.clone();
  }

  setHour(hour: number): RcDate {
    this._date.setHours(hour);
    return this.clone();
  }

  setMinute(minute: number): RcDate {
    this._date.setMinutes(minute);
    return this.clone();
  }

  setSecond(second: number): RcDate {
    this._date.setSeconds(second);
    return this.clone();
  }
}

export default RcDate;
export type { RcDateInitType };

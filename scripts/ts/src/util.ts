module Util {
  export function dateToDay(date: Date): Date {
    date.setHours(0, 0, 0, 0);

    return date;
  }
}

import { DateTime } from 'luxon';

export const MAX_DATE_TIME: DateTime = DateTime.fromObject({
  year: 9999,
  month: 12,
  day: 31,
  hour: 23,
  minute: 59,
  second: 59,
  millisecond: 999,
});

export const MAX_DATE_STRING = '9999-12-31T23:59:59.9999999';

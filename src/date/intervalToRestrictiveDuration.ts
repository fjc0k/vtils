import {
  compareAsc,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  isValid,
  sub,
} from 'date-fns'
import { anyToDate } from './anyToDate.ts'

export type IntervalToRestrictiveDurationTarget =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

export interface IntervalToRestrictiveDurationResult {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

// ref: https://github.com/date-fns/date-fns/blob/master/src/intervalToDuration/index.js
export function intervalToRestrictiveDuration(
  start: string | number | Date,
  end: string | number | Date,
  target: IntervalToRestrictiveDurationTarget = 'year',
): IntervalToRestrictiveDurationResult {
  const dateLeft = anyToDate(start)
  const dateRight = anyToDate(end)

  if (!isValid(dateLeft)) {
    throw new RangeError('Start Date is invalid')
  }
  if (!isValid(dateRight)) {
    throw new RangeError('End Date is invalid')
  }

  const duration: IntervalToRestrictiveDurationResult = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }

  let remaining: Date = dateLeft

  const sign = compareAsc(dateLeft, dateRight)

  if (target === 'year') {
    duration.years = Math.abs(differenceInYears(remaining, dateRight))
  }

  if (target === 'year' || target === 'month') {
    remaining = sub(remaining, { years: sign * duration.years })
    duration.months = Math.abs(differenceInMonths(remaining, dateRight))
  }

  if (target === 'year' || target === 'month' || target === 'day') {
    remaining = sub(remaining, { months: sign * duration.months })
    duration.days = Math.abs(differenceInDays(remaining, dateRight))
  }

  if (
    target === 'year' ||
    target === 'month' ||
    target === 'day' ||
    target === 'hour'
  ) {
    remaining = sub(remaining, { days: sign * duration.days })
    duration.hours = Math.abs(differenceInHours(remaining, dateRight))
  }

  if (
    target === 'year' ||
    target === 'month' ||
    target === 'day' ||
    target === 'hour' ||
    target === 'minute'
  ) {
    remaining = sub(remaining, { hours: sign * duration.hours })
    duration.minutes = Math.abs(differenceInMinutes(remaining, dateRight))
  }

  if (
    target === 'year' ||
    target === 'month' ||
    target === 'day' ||
    target === 'hour' ||
    target === 'minute' ||
    target === 'second'
  ) {
    remaining = sub(remaining, { minutes: sign * duration.minutes })
    duration.seconds = Math.abs(differenceInSeconds(remaining, dateRight))
  }

  if (
    target === 'year' ||
    target === 'month' ||
    target === 'day' ||
    target === 'hour' ||
    target === 'minute' ||
    target === 'second' ||
    target === 'millisecond'
  ) {
    remaining = sub(remaining, { seconds: sign * duration.seconds })
    duration.milliseconds = Math.abs(
      differenceInMilliseconds(remaining, dateRight),
    )
  }

  return duration
}

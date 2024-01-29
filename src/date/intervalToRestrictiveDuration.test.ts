import { addDays, addMilliseconds, addYears } from 'date-fns'
import { intervalToRestrictiveDuration } from './intervalToRestrictiveDuration'

describe('intervalToRestrictiveDuration', () => {
  const start = new Date(2020, 5 - 1, 21, 0, 0, 0, 0)
  const end = addYears(addMilliseconds(addDays(start, 2), 200), 1)

  test('未设置 target 时表现正常', () => {
    expect(intervalToRestrictiveDuration(start, end)).toMatchSnapshot()
  })

  test('target 为 year 时表现正常', () => {
    expect(intervalToRestrictiveDuration(start, end, 'year')).toMatchSnapshot()
  })

  test('target 为 month 时表现正常', () => {
    expect(intervalToRestrictiveDuration(start, end, 'month')).toMatchSnapshot()
  })

  test('target 为 day 时表现正常', () => {
    expect(intervalToRestrictiveDuration(start, end, 'day')).toMatchSnapshot()
  })

  test('target 为 hour 时表现正常', () => {
    expect(intervalToRestrictiveDuration(start, end, 'hour')).toMatchSnapshot()
  })

  test('target 为 minute 时表现正常', () => {
    expect(
      intervalToRestrictiveDuration(start, end, 'minute'),
    ).toMatchSnapshot()
  })

  test('target 为 second 时表现正常', () => {
    expect(
      intervalToRestrictiveDuration(start, end, 'second'),
    ).toMatchSnapshot()
  })

  test('target 为 millisecond 时表现正常', () => {
    expect(
      intervalToRestrictiveDuration(start, end, 'millisecond'),
    ).toMatchSnapshot()
  })
})

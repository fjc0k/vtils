import { addDays, addYears, subDays, subYears } from 'date-fns'
import { formatDistancePlus } from './formatDistancePlus'

jest.useFakeTimers()

describe('formatDistancePlus', () => {
  test('前', () => {
    expect(formatDistancePlus(subDays(new Date(), 1))).toBe('1天前')
    expect(formatDistancePlus(subDays(new Date(), 1.5))).toBe('2天前')
    expect(formatDistancePlus(subYears(new Date(), 10))).toBe('10年前')

    expect(
      formatDistancePlus(subDays(new Date(), 1), addDays(new Date(), 2)),
    ).toBe('3天前')
    expect(
      formatDistancePlus(subDays(new Date(), 1.5), addDays(new Date(), 2)),
    ).toBe('4天前')
    expect(
      formatDistancePlus(subYears(new Date(), 10), addYears(new Date(), 3)),
    ).toBe('13年前')
  })

  test('后', () => {
    expect(formatDistancePlus(addDays(new Date(), 1.2))).toBe('1天后')
    expect(formatDistancePlus(addDays(new Date(), 1.5))).toBe('1天后')
    expect(formatDistancePlus(addYears(new Date(), 10))).toBe('10年后')

    expect(
      formatDistancePlus(addDays(new Date(), 1), subDays(new Date(), 1)),
    ).toBe('2天后')
    expect(
      formatDistancePlus(addDays(new Date(), 1.5), subDays(new Date(), 1)),
    ).toBe('2天后')
    expect(
      formatDistancePlus(addYears(new Date(), 10), subYears(new Date(), 10)),
    ).toBe('20年后')
  })
})

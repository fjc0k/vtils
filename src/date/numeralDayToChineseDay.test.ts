import { numeralDayToChineseDay } from './numeralDayToChineseDay'

describe('numeralDayToChineseDay', () => {
  test('转换正常', () => {
    expect(numeralDayToChineseDay(0)).toBe('日')
    expect(numeralDayToChineseDay(1)).toBe('一')
    expect(numeralDayToChineseDay(2)).toBe('二')
    expect(numeralDayToChineseDay(3)).toBe('三')
    expect(numeralDayToChineseDay(4)).toBe('四')
    expect(numeralDayToChineseDay(5)).toBe('五')
    expect(numeralDayToChineseDay(6)).toBe('六')
    expect(numeralDayToChineseDay(7)).toBe('日')
  })
})

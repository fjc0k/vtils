import { removeBlankChars } from './removeBlankChars'

describe('removeBlankChars', () => {
  test('半角空格', () => {
    expect(removeBlankChars('o k')).toBe('ok')
  })

  test('全角空格', () => {
    expect(removeBlankChars('o　k')).toBe('ok')
  })

  test('半角空格+全角空格', () => {
    expect(removeBlankChars(' o 　k ')).toBe('ok')
  })

  test('换行', () => {
    expect(removeBlankChars('o\r\nk')).toBe('ok')
  })

  test('特殊', () => {
    expect(removeBlankChars('o\u180E\u200Bk')).toBe('ok')
  })
})

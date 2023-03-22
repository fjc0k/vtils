import { toSingleLineString } from './toSingleLineString'

describe('toSingleLineString', () => {
  test('ok', () => {
    expect(toSingleLineString('a\rb')).toBe('a b')
    expect(toSingleLineString('a\r\n\n\r\nb')).toBe('a b')
    expect(toSingleLineString('a\r\n\n\r\nb\r\n')).toBe('a b')
    expect(toSingleLineString('a\r\n\n\r\nb\r\nc')).toBe('a b c')
    expect(toSingleLineString('\r\n\n\r\n')).toBe('')
    expect(toSingleLineString('a\rb\ncvldlddd', 5)).toBe('a ...')
    expect(
      toSingleLineString('a\rb\ncvldlddd', {
        length: 5,
      }),
    ).toBe('a ...')
  })
})

import { isNumeric } from './isNumeric.ts'

describe('isNumeric', () => {
  test('不是数值', () => {
    for (const value of [
      '',
      false,
      null,
      undefined,
      () => 1,
      [],
      {},
      NaN,
      Infinity,
      Number.NEGATIVE_INFINITY,
    ]) {
      expect(isNumeric(value)).toBeFalse()
    }
  })

  test('是数值', () => {
    for (const value of ['1', '566', '-22', 1.2, 2, -0.45, 0]) {
      expect(isNumeric(value)).toBeTrue()
    }
  })
})

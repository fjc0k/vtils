import { isVisibleValue } from './isVisibleValue.ts'

describe('isVisibleValue', () => {
  test('不是', () => {
    expect(isVisibleValue(undefined)).toBeFalse()
    expect(isVisibleValue(null)).toBeFalse()
    expect(isVisibleValue(false)).toBeFalse()
    expect(isVisibleValue(true)).toBeFalse()
    expect(isVisibleValue('')).toBeFalse()
  })

  test('是', () => {
    expect(isVisibleValue(0)).toBeTrue()
    expect(isVisibleValue('1')).toBeTrue()
    expect(isVisibleValue({})).toBeTrue()
    expect(isVisibleValue([])).toBeTrue()
  })
})

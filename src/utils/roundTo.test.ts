import { roundTo } from './roundTo'

describe('roundTo', () => {
  test('表现正常', () => {
    expect(roundTo(5.2)).toBe(5)
    expect(roundTo(5.25)).toBe(5)
    expect(roundTo(5.52)).toBe(6)
    expect(roundTo(5.6)).toBe(6)

    expect(roundTo(5.2, 1)).toBe(5.2)
    expect(roundTo(5.25, 1)).toBe(5.3)
    expect(roundTo(5.52, 1)).toBe(5.5)
    expect(roundTo(5.6, 1)).toBe(5.6)

    expect(roundTo(5.0, 0, 2)).toBe(5)
    expect(roundTo(5.1, 0, 2)).toBe(5)
    expect(roundTo(5.2, 0, 2)).toBe(6)
    expect(roundTo(5.3, 0, 2)).toBe(6)
  })
})

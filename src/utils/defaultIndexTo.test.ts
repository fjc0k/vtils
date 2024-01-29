import { defaultIndexTo } from './defaultIndexTo.ts'

describe('defaultIndexTo', () => {
  test('ok', () => {
    expect(defaultIndexTo(-1, 1)).toBe(1)
    expect(defaultIndexTo(-1, 0)).toBe(0)
    expect(defaultIndexTo(-2, 0)).toBe(0)
    expect(defaultIndexTo(NaN, 1)).toBe(1)
    expect(defaultIndexTo(NaN, 0)).toBe(0)
    expect(defaultIndexTo(1, 0)).toBe(1)
    expect(defaultIndexTo(2, 1)).toBe(2)
  })
})

import { anyToDate } from './anyToDate'

describe('anyToDate', () => {
  test('表现正常', () => {
    const now = new Date()

    expect(anyToDate(now.getTime())).toEqual(now)
    expect(anyToDate(Math.round(now.getTime() / 1000))).toEqual(
      (() => {
        const _now = new Date(now)
        _now.setMilliseconds(0)
        return _now
      })(),
    )

    expect(anyToDate(String(now.getTime()))).toEqual(now)
    expect(anyToDate(String(Math.round(now.getTime() / 1000)))).toEqual(
      (() => {
        const _now = new Date(now)
        _now.setMilliseconds(0)
        return _now
      })(),
    )

    expect(anyToDate(now.toISOString())).toEqual(now)

    expect(anyToDate(now)).toEqual(now)
  })
})

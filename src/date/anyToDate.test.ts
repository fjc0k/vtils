import { anyToDate } from './anyToDate'

describe('anyToDate', () => {
  test('表现正常', () => {
    const now = new Date()

    expect(anyToDate(now.getTime())).toEqual(now)
    expect(anyToDate(Math.round(now.getTime() / 1000))).toEqual(
      new Date(Math.round(now.getTime() / 1000) * 1000),
    )

    expect(anyToDate(String(now.getTime()))).toEqual(now)
    expect(anyToDate(String(Math.round(now.getTime() / 1000)))).toEqual(
      new Date(Math.round(now.getTime() / 1000) * 1000),
    )

    expect(anyToDate(now.toISOString())).toEqual(now)

    expect(anyToDate(now)).toEqual(now)
  })
})

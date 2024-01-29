import { ms } from './ms.ts'

describe('ms', () => {
  test('纯数字正常', () => {
    expect(ms(1)).toBe(1)
    expect(ms(2.5)).toBe(2.5)
    expect(ms(100)).toBe(100)
  })

  test('纯字符串正常', () => {
    expect(ms('1ms')).toBe(1)
    expect(ms('1s')).toBe(1000)
    expect(ms('5d')).toBe(5 * 24 * 60 * 60 * 1000)
  })

  test('数字+单位正常', () => {
    expect(ms(1, 'ms')).toBe(1)
    expect(ms(1, 's')).toBe(1000)
    expect(ms(5, 'd')).toBe(5 * 24 * 60 * 60 * 1000)
  })

  test('返回秒正常', () => {
    expect(ms('1s', true)).toBe(1)
    expect(ms('5d', true)).toBe(5 * 24 * 60 * 60)
    expect(ms(1, 's', true)).toBe(1)
    expect(ms(5, 'd', true)).toBe(5 * 24 * 60 * 60)
  })

  test('非法值应报错', () => {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms('')
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms(undefined)
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms(null)
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms([])
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms({})
    }).toThrowError()
    expect(function () {
      ms(NaN)
    }).toThrowError()
    expect(function () {
      ms(Infinity)
    }).toThrowError()
    expect(function () {
      ms(-Infinity)
    }).toThrowError()
    expect(function () {
      ms(
        1,
        // @ts-expect-error - We expect this to throw.
        'mo',
      )
    }).toThrowError()
    expect(function () {
      ms(
        1,
        // @ts-expect-error - We expect this to throw.
        {},
      )
    }).toThrowError()
  })

  test('小数正常', () => {
    expect(ms('1.1ms')).toBe(1.1)
    expect(ms(1.1, 'ms')).toBe(1.1)
  })
})

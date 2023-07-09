import { bytes } from './bytes'

describe('bytes', () => {
  test('ok', () => {
    expect(bytes(1024)).toBe(1024)
    expect(bytes('1024B')).toBe(1024)
    expect(bytes(2048, 'B')).toBe(2048)

    expect(bytes('1KB')).toBe(1024)
    expect(bytes(1, 'KB')).toBe(1024)
    expect(bytes(2, 'KB')).toBe(2048)

    expect(bytes('1MB')).toBe(1048576)
    expect(bytes(1, 'MB')).toBe(1048576)
    expect(bytes(1024, 'KB')).toBe(1048576)

    expect(bytes('1GB')).toBe(1073741824)
    expect(bytes(1, 'GB')).toBe(1073741824)
    expect(bytes('1024MB')).toBe(1073741824)

    expect(bytes('1TB')).toBe(1099511627776)
    expect(bytes(1, 'TB')).toBe(1099511627776)
    expect(bytes('1024GB')).toBe(1099511627776)

    expect(bytes('1PB')).toBe(1125899906842624)
    expect(bytes(1, 'PB')).toBe(1125899906842624)
    expect(bytes('1024TB')).toBe(1125899906842624)
  })

  test('非法值应报错', () => {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      bytes('')
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      bytes(undefined)
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      bytes(null)
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      bytes([])
    }).toThrowError()
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      bytes({})
    }).toThrowError()
    expect(function () {
      bytes(NaN)
    }).toThrowError()
    expect(function () {
      bytes(Infinity)
    }).toThrowError()
    expect(function () {
      bytes(-Infinity)
    }).toThrowError()
    expect(function () {
      bytes(
        1,
        // @ts-expect-error - We expect this to throw.
        'BB',
      )
    }).toThrowError()
    expect(function () {
      bytes(
        // @ts-expect-error - We expect this to throw.
        '1BB',
      )
    }).toThrowError()
    expect(function () {
      bytes(
        1,
        // @ts-expect-error - We expect this to throw.
        {},
      )
    }).toThrowError()
  })

  test('小数正常', () => {
    expect(bytes('1.1B')).toBe(1.1)
    expect(bytes(1.1, 'B')).toBe(1.1)
  })
})

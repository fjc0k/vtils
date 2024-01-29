import { isPromiseLike } from './isPromiseLike.ts'

describe('isPromiseLike', () => {
  test('不像 Promise', () => {
    for (const value of [
      '',
      null,
      undefined,
      1,
      /dd/,
      {},
      [],
      async () => 1,
      Map,
    ]) {
      expect(isPromiseLike(value)).toBeFalse()
    }
  })

  test('像 Promise', () => {
    for (const value of [
      { then: () => 1 },
      Promise.resolve(),
      (async () => true)(),
    ]) {
      expect(isPromiseLike(value)).toBeTrue()
    }
  })
})

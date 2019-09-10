import {includes} from './includes'

[
  ['存在原生的 includes', () => {}],
  ['不存在原生的 includes', () => {
    const originalStringIncludes = String.prototype.includes
    const originalArrayIncludes = Array.prototype.includes

    beforeAll(() => {
      String.prototype.includes = null as any
      Array.prototype.includes = null as any
    })

    afterAll(() => {
      String.prototype.includes = originalStringIncludes
      Array.prototype.includes = originalArrayIncludes
    })
  }],
].forEach(([desc, before]) => {
  describe(desc, () => {
    (before as any)()

    test('字符串', () => {
      expect(includes('', '')).toBeTruthy()
      expect(includes('hello', '')).toBeTruthy()
      expect(includes('hello', 'h')).toBeTruthy()
      expect(includes('hello', 'o')).toBeTruthy()
      expect(includes('hello', '0')).toBeFalsy()
    })

    test('数组', () => {
      expect(includes([], undefined)).toBeFalsy()
      expect(includes(['hello'], '')).toBeFalsy()
      expect(includes(['hello'], 'hello')).toBeTruthy()
      expect(includes(['hello', 2], 2)).toBeTruthy()
      expect(includes(['hello', 2, NaN], NaN)).toBeTruthy()
    })

    test('对象', () => {
      const sym = Symbol()
      const obj = {
        x: 1,
        y: 'hello',
        2: 0,
        [sym]: [],
      }
      expect(includes(obj, 1)).toBeTruthy()
      expect(includes(obj, 'hello')).toBeTruthy()
      expect(includes(obj, 0)).toBeTruthy()
      expect(includes(obj, obj[sym] as any)).toBeFalsy()
    })
  })
})

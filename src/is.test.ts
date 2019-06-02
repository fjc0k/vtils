import * as is from './is'
import { has } from './has'
import { ii } from './ii'

const tests: Record<keyof typeof is, (_: typeof is) => void> = {
  isArray({ isArray }) {
    // 不是
    [
      '',
      0,
      false,
      undefined,
      null,
      {},
      () => {},
    ].forEach(item => {
      expect(isArray(item)).toBeFalsy()
    })

    // 是
    ;[
      [],
      [-1],
      new Array(),
      Array(4),
    ].forEach(item => {
      expect(isArray(item)).toBeTruthy()
    })
  },

  isBoolean({ isBoolean }) {
    // 不是
    [
      '',
      0,
      undefined,
      null,
      {},
      () => {},
    ].forEach(item => {
      expect(isBoolean(item)).toBeFalsy()
    })

    // 是
    ;[
      true,
      false,
      Boolean('x'),
    ].forEach(item => {
      expect(isBoolean(item)).toBeTruthy()
    })
  },

  isChineseIDCardNumber({ isChineseIDCardNumber }) {
    // 不是
    [
      '2000',
      '190101881101231',
      '110101881301231',
      '110101198811214398',
      '11010119881101331a',
      '469001399208187005',
      '46900119925818180x',
      '530627199508918277',
      '110106100001019457', // 1000 年
      '140425900001017773', // 9000 年
    ].forEach(item => {
      expect(isChineseIDCardNumber(item)).toBeFalsy()
    })

    // 是
    ;[
      '110101881101231',
      '110101198811014398',
      '11010119881101331X',
      '469001199208187005',
      '46900119920818180x',
    ].forEach(item => {
      expect(isChineseIDCardNumber(item)).toBeTruthy()
    })
  },

  isPossibleChineseMobilePhoneNumber({ isPossibleChineseMobilePhoneNumber }) {
    // 不是
    [
      '',
      110,
      120,
      10086,
      '180800300800',
      12345678,
      87654321,
    ].forEach(item => {
      expect(isPossibleChineseMobilePhoneNumber(item)).toBeFalsy()
    })

    // 是
    ;[
      16080030080,
      18087030088,
      13907199856,
      13591512420,
      19913769406,
      18512345657,
    ].forEach(item => {
      expect(isPossibleChineseMobilePhoneNumber(item)).toBeTruthy()
    })
  },

  isPossibleChineseName({ isPossibleChineseName }) {
    // 不是
    [
      '我',
      '我1',
      '我,们',
      '我，的家',
      '畫羣飃#姉',
      '阿··不多',
      '·不多',
    ].forEach(item => {
      expect(isPossibleChineseName(item)).toBeFalsy()
    })

    // 是
    ;[
      '我们',
      '我的家',
      '畫羣飃姉椛鵺',
      '阿·不多',
      '马騳骉',
      '段晅',
      '应骞斅',
    ].forEach(item => {
      expect(isPossibleChineseName(item)).toBeTruthy()
    })
  },

  isDate({ isDate }) {
    // 不是
    [
      1,
      '',
      false,
      null,
      undefined,
    ].forEach(item => {
      expect(isDate(item)).toBeFalsy()
    })

    // 是
    ;[
      new Date(),
    ].forEach(item => {
      expect(isDate(item)).toBeTruthy()
    })
  },

  isEmail({ isEmail }) {
    // 不是
    [
      'ee@foo.bar.y',
      '@foo.bar',
      'foo.bar',
    ].forEach(item => {
      expect(isEmail(item)).toBeFalsy()
    })

    // 是
    ;[
      'ee@foo.bar',
      'ee@foo.bar.ye',
      'ee.0@foo.1.xx.qq',
    ].forEach(item => {
      expect(isEmail(item)).toBeTruthy()
    })
  },

  isEmpty({ isEmpty }) {
    // 不是
    [
      0,
      -1,
      ' ',
      /d/,
      () => {},
      { x: null },
      { y: undefined },
      [undefined],
    ].forEach(item => {
      expect(isEmpty(item)).toBeFalsy()
    })

    // 是
    ;[
      undefined,
      null,
      '',
      false,
      true,
      [],
      {},
      Object.create(null),
    ].forEach(item => {
      expect(isEmpty(item)).toBeTruthy()
    })
  },

  isEqualArray({ isEqualArray }) {
    // 不是
    [
      [[1], [3], [4], [null]],
      [[2, 3], ['2', '3']],
      [[2], [2, 2]],
      [[2], 2 as any],
    ].forEach(item => {
      expect(isEqualArray(...item)).toBeFalsy()
    })

    // 是
    ;[
      [[], []],
      [[1], [1], [1], [1]],
      [['2', '3'], ['2', '3']],
    ].forEach(item => {
      expect(isEqualArray(...item)).toBeTruthy()
    })
  },

  isFinite({ isFinite }) {
    // 不是
    [
      Infinity,
      Number.NEGATIVE_INFINITY,
      NaN,
    ].forEach(item => {
      expect(isFinite(item)).toBeFalsy()
    })

    // 是
    ;[
      0,
      -99,
      6666,
      Number.MIN_VALUE,
      Number.MAX_VALUE,
    ].forEach(item => {
      expect(isFinite(item)).toBeTruthy()
    })
  },

  isFunction({ isFunction }) {
    // 不是
    [
      '',
      0,
      false,
      undefined,
      null,
      {},
    ].forEach(item => {
      expect(isFunction(item)).toBeFalsy()
    })

    // 是
    ;[
      () => {},
      Math.round,
      // eslint-disable-next-line no-new-func
      Function('return this'),
    ].forEach(item => {
      expect(isFunction(item)).toBeTruthy()
    })
  },

  isHan({ isHan }) {
    // 不是
    [
      '',
      'd',
      '22',
      '多多.,',
      '登录-了',
      '，',
    ].forEach(item => {
      expect(isHan(item)).toBeFalsy()
    })

    // 是
    ;[
      '多多',
      '等待',
      '我',
    ].forEach(item => {
      expect(isHan(item)).toBeTruthy()
    })
  },

  isInteger({ isInteger }) {
    // 不是
    [
      Infinity,
      Number.NEGATIVE_INFINITY,
      NaN,
      1.2,
      -0.45,
    ].forEach(item => {
      expect(isInteger(item)).toBeFalsy()
    })

    // 是
    ;[
      0,
      -99,
      6666,
    ].forEach(item => {
      expect(isInteger(item)).toBeTruthy()
    })
  },

  isNaN({ isNaN }) {
    // 不是
    [
      Infinity,
      Number.NEGATIVE_INFINITY,
      1.2,
      -0.45,
      0,
    ].forEach(item => {
      expect(isNaN(item)).toBeFalsy()
    })

    // 是
    ;[
      NaN,
      Number.NaN,
    ].forEach(item => {
      expect(isNaN(item)).toBeTruthy()
    })
  },

  isNegativeInteger({ isNegativeInteger }) {
    // 不是
    [
      Infinity,
      Number.NEGATIVE_INFINITY,
      1.2,
      2,
      -0.45,
      0,
      NaN,
    ].forEach(item => {
      expect(isNegativeInteger(item)).toBeFalsy()
    })

    // 是
    ;[
      -1,
      -3,
      -4,
      -500,
    ].forEach(item => {
      expect(isNegativeInteger(item)).toBeTruthy()
    })
  },

  isNil({ isNil }) {
    // 不是
    [
      '',
      0,
      false,
      {},
      () => {},
      /33/,
    ].forEach(item => {
      expect(isNil(item)).toBeFalsy()
    })

    // 是
    ;[
      null,
      undefined,
      void 0,
    ].forEach(item => {
      expect(isNil(item)).toBeTruthy()
    })
  },

  isNull({ isNull }) {
    // 不是
    [
      '',
      0,
      false,
      {},
      () => {},
      /33/,
      undefined,
    ].forEach(item => {
      expect(isNull(item)).toBeFalsy()
    })

    // 是
    ;[
      null,
    ].forEach(item => {
      expect(isNull(item)).toBeTruthy()
    })
  },

  isNumber({ isNumber }) {
    // 不是
    [
      '',
      false,
      null,
      undefined,
      () => {},
      [],
      {},
      NaN,
    ].forEach(item => {
      expect(isNumber(item)).toBeFalsy()
    })

    // 是
    ;[
      Infinity,
      Number.NEGATIVE_INFINITY,
      1.2,
      2,
      -0.45,
      0,
    ].forEach(item => {
      expect(isNumber(item)).toBeTruthy()
    })
  },

  isNumeric({ isNumeric }) {
    // 不是
    [
      '',
      false,
      null,
      undefined,
      () => {},
      [],
      {},
      NaN,
      Infinity,
      Number.NEGATIVE_INFINITY,
    ].forEach(item => {
      expect(isNumeric(item)).toBeFalsy()
    })

    // 是
    ;[
      '1',
      '566',
      '-22',
      1.2,
      2,
      -0.45,
      0,
    ].forEach(item => {
      expect(isNumeric(item)).toBeTruthy()
    })
  },

  isObject({ isObject }) {
    // 不是
    [
      '',
      false,
      null,
      undefined,
      NaN,
      Infinity,
      Number.NEGATIVE_INFINITY,
    ].forEach(item => {
      expect(isObject(item)).toBeFalsy()
    })

    // 是
    ;[
      {},
      [],
      Math,
      () => {},
      /ddd/,
    ].forEach(item => {
      expect(isObject(item)).toBeTruthy()
    })
  },

  isPlainObject({ isPlainObject }) {
    // 不是
    [
      '',
      false,
      null,
      undefined,
      NaN,
      Infinity,
      Number.NEGATIVE_INFINITY,
      [],
      class {},
      () => {},
      /ddd/,
    ].forEach(item => {
      expect(isPlainObject(item)).toBeFalsy()
    })

    // 是
    ;[
      {},
      Object.create(null),
      Math,
    ].forEach(item => {
      expect(isPlainObject(item)).toBeTruthy()
    })
  },

  isPositiveInteger({ isPositiveInteger }) {
    // 不是
    [
      Infinity,
      Number.NEGATIVE_INFINITY,
      1.2,
      -2,
      -0.45,
      0,
      NaN,
    ].forEach(item => {
      expect(isPositiveInteger(item)).toBeFalsy()
    })

    // 是
    ;[
      1,
      3,
      4,
      500,
    ].forEach(item => {
      expect(isPositiveInteger(item)).toBeTruthy()
    })
  },

  isPromiseLike({ isPromiseLike }) {
    // 不是
    [
      () => {},
      null,
      1,
      /dd/,
      Math,
      Promise,
    ].forEach(item => {
      expect(isPromiseLike(item)).toBeFalsy()
    })

    // 是
    ;[
      new Promise(() => {}),
      Promise.resolve(),
      Promise.reject().catch(() => {}),
      { then: () => {} },
      ii(() => new Promise(resolve => resolve())),
    ].forEach(item => {
      expect(isPromiseLike(item)).toBeTruthy()
    })
  },

  isRegExp({ isRegExp }) {
    // 不是
    [
      () => {},
      null,
      1,
      Math,
      Promise,
    ].forEach(item => {
      expect(isRegExp(item)).toBeFalsy()
    })

    // 是
    ;[
      /dd/,
      new RegExp('ffff'),
    ].forEach(item => {
      expect(isRegExp(item)).toBeTruthy()
    })
  },

  isString({ isString }) {
    // 不是
    [
      () => {},
      null,
      1,
      Math,
      Promise,
      undefined,
      /dd/,
    ].forEach(item => {
      expect(isString(item)).toBeFalsy()
    })

    // 是
    ;[
      'ddd',
      String(2),
    ].forEach(item => {
      expect(isString(item)).toBeTruthy()
    })
  },

  isUndefined({ isUndefined }) {
    // 不是
    [
      () => {},
      null,
      1,
      Math,
      Promise,
      /dd/,
      'sss',
    ].forEach(item => {
      expect(isUndefined(item)).toBeFalsy()
    })

    // 是
    ;[
      undefined,
      void 0,
    ].forEach(item => {
      expect(isUndefined(item)).toBeTruthy()
    })
  },

  isUrl({ isUrl }) {
    // 不是
    [
      'http://127.0.0.1',
      'http://foo.bar:8878878',
      'wx://foo.bar',
      'foo.bar',
      'http://',
      'https://',
      'ftp://foo.bar',
      'http://1111.0.1.22',
      '大口大口http://foo.bar',
      'http://foo.bar:80得到了',
    ].forEach(item => {
      expect(isUrl(item)).toBeFalsy()
    })

    // 是
    ;[
      'http://foo.bar',
      'http://foo.bar:80',
      'http://foo.bar/oop?ddd#cc',
      'https://foo.bar',
      'http://39.137.107.98:22/hello',
    ].forEach(item => {
      expect(isUrl(item)).toBeTruthy()
    })
  },
}

for (const key in tests) {
  if (has(tests, key)) {
    test(
      key,
      () => (tests as any)[key](is),
    )
  }
}

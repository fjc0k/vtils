import * as vtils from '../src'
import moment from 'moment'

const now = new Date()

describe('noop', () => {
  test('noop', () => {
    expect(vtils.noop()).toBeUndefined()
  })
})

describe('bindEvent', () => {
  test(`'click'`, () => {
    const div = document.createElement('div')
    const listener = jest.fn()
    vtils.bindEvent(div, 'click', listener)
    expect(listener).toBeCalledTimes(0)
    div.click()
    expect(listener).toBeCalledTimes(1)
    div.click()
    expect(listener).toBeCalledTimes(2)
  })
  test(`'click tap'`, () => {
    const div = document.createElement('div')
    const listener = jest.fn()
    vtils.bindEvent(div, 'click tap', listener)
    expect(listener).toBeCalledTimes(0)
    div.click()
    expect(listener).toBeCalledTimes(1)
    div.dispatchEvent(new CustomEvent('tap'))
    expect(listener).toBeCalledTimes(2)
  })
  test(`['click', 'tap']`, () => {
    const div = document.createElement('div')
    const listener = jest.fn()
    vtils.bindEvent(div, ['click', 'tap'], listener)
    expect(listener).toBeCalledTimes(0)
    div.click()
    expect(listener).toBeCalledTimes(1)
    div.dispatchEvent(new CustomEvent('tap'))
    expect(listener).toBeCalledTimes(2)
  })
  test(`解绑`, () => {
    const div = document.createElement('div')
    const listener = jest.fn()
    const unbind = vtils.bindEvent(div, 'click', listener)
    expect(listener).toBeCalledTimes(0)
    div.click()
    expect(listener).toBeCalledTimes(1)
    div.click()
    expect(listener).toBeCalledTimes(2)
    unbind()
    div.click()
    expect(listener).toBeCalledTimes(2)
  })
})

describe('castArray', () => {
  test('数组保持不变', () => {
    expect(vtils.castArray([1])).toEqual([1])
    expect(vtils.castArray([true])).toEqual([true])
    expect(vtils.castArray([1, true])).toEqual([1, true])
    expect(vtils.castArray([1, true, now])).toEqual([1, true, now])
  })
  test('非数组强制转为一维数组', () => {
    expect(vtils.castArray(1)).toEqual([1])
    expect(vtils.castArray(true)).toEqual([true])
    expect(vtils.castArray('hello')).toEqual(['hello'])
    expect(vtils.castArray(now)).toEqual([now])
  })
})

describe('clamp', () => {
  test('上下限值之间返回原值', () => {
    expect(vtils.clamp(5, 1, 20)).toEqual(5)
    expect(vtils.clamp(0, -0.001, 0.11)).toEqual(0)
  })
  test('边界值处返回边界值', () => {
    expect(vtils.clamp(1, 1, 20)).toEqual(1)
    expect(vtils.clamp(0.11, -0.001, 0.11)).toEqual(0.11)
  })
})

describe('reduce', () => {
  test('数组归纳', () => {
    expect(vtils.reduce([1, 2, 3], (total, value) => {
      return total + value
    }, 0)).toBe(6)
  })
  test('对象归纳', () => {
    expect(vtils.reduce({ x: 'x', y: 'y', z: 'z', t: 2 }, (result, value) => {
      return result + value
    }, '')).toBe('xyz2')
  })
})

describe('repeat', () => {
  test('空字符串', () => {
    expect(vtils.repeat('')).toBe('')
    expect(vtils.repeat('', 20)).toBe('')
  })
  test('字符串', () => {
    expect(vtils.repeat('我们')).toBe('我们')
    expect(vtils.repeat('我们', 2)).toBe('我们我们')
  })
  test('数字', () => {
    expect(vtils.repeat(1)).toBe('1')
    expect(vtils.repeat(1, 2)).toBe('11')
  })
  test('负数、0、1', () => {
    expect(vtils.repeat(1, -1)).toBe('')
    expect(vtils.repeat('我们', -2)).toBe('')
    expect(vtils.repeat(1, 0)).toBe('')
    expect(vtils.repeat('我们', 0)).toBe('')
    expect(vtils.repeat(1, 1)).toBe('1')
    expect(vtils.repeat('我们', 1)).toBe('我们')
  })
})

describe('base64', () => {
  const data: Array<[string | number, string, string]> = [
    ['', '', ''],
    ['v', 'dg==', 'dg'],
    ['vtils', 'dnRpbHM=', 'dnRpbHM'],
    ['vtils.base64Encode', 'dnRpbHMuYmFzZTY0RW5jb2Rl', 'dnRpbHMuYmFzZTY0RW5jb2Rl'],
    ['JavaScript 工具库', 'SmF2YVNjcmlwdCDlt6XlhbflupM=', 'SmF2YVNjcmlwdCDlt6XlhbflupM'],
    ['JavaScript\n工具库', 'SmF2YVNjcmlwdArlt6XlhbflupM=', 'SmF2YVNjcmlwdArlt6XlhbflupM'],
    ['\0', 'AA==', 'AA'],
    [1, 'MQ==', 'MQ'],
    [-1, 'LTE=', 'LTE'],
    ['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#0^&*();:<>,. []{}', 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw+LC4gW117fQ==', 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw-LC4gW117fQ'],
    ['😁😎=-#@`.,?/|{*+😁', '8J+YgfCfmI49LSNAYC4sPy98eyor8J+YgQ==', '8J-YgfCfmI49LSNAYC4sPy98eyor8J-YgQ'],
    ['❥(ゝω・✿ฺ)※▓●²♠⑲Ⅲ∵molÇùㄡεətsフぽㅚ㉢д╢┉(๑╹◡╹)ﾉ"""', '4p2lKOOCnc+J44O74py/4Li6KeKAu+KWk+KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c+ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI=', '4p2lKOOCnc-J44O74py_4Li6KeKAu-KWk-KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c-ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI'],
  ]
  test('encode', () => {
    data.forEach(([str, encodedStr]) => {
      expect(vtils.base64Encode(str)).toBe(encodedStr)
    })
  })
  test('decode', () => {
    data.forEach(([str, encodedStr]) => {
      expect(vtils.base64Decode(encodedStr)).toBe(String(str))
    })
  })
  test('url encode', () => {
    data.forEach(([str, _encodedStr, encodedUrlStr]) => {
      expect(vtils.base64UrlEncode(str)).toBe(encodedUrlStr)
    })
  })
  test('url decode', () => {
    data.forEach(([str, _encodedStr, encodedUrlStr]) => {
      expect(vtils.base64UrlDecode(encodedUrlStr)).toBe(String(str))
    })
  })
})

describe('Disposer', () => {
  const disposer = new vtils.Disposer()
  const helloDispose1 = jest.fn()
  const helloDispose2 = jest.fn()
  const helloDispose3 = jest.fn()
  test('add', () => {
    disposer.add('hello', helloDispose1)
    expect((disposer as any).jar.hello).toEqual([helloDispose1])
    disposer.add('hello', [helloDispose2, helloDispose3])
    expect((disposer as any).jar.hello).toEqual([helloDispose1, helloDispose2, helloDispose3])
  })
  test('dispose', () => {
    disposer.dispose('hello')
    expect(helloDispose1).toBeCalledTimes(1)
    expect(helloDispose2).toBeCalledTimes(1)
    expect(helloDispose3).toBeCalledTimes(1)
    expect((disposer as any).jar.hello).toBeUndefined()
  })
  test('disposeAll', () => {
    const dispose1 = jest.fn()
    const dispose2 = jest.fn()
    const dispose3 = jest.fn()
    disposer.add('1', dispose1)
    disposer.add('2', dispose2)
    disposer.add('3', dispose3)
    disposer.disposeAll()
    expect(helloDispose1).toBeCalledTimes(1)
    expect(helloDispose2).toBeCalledTimes(1)
    expect(helloDispose3).toBeCalledTimes(1)
    expect((disposer as any).jar).toEqual({})
  })
  test('匿名项目', () => {
    const dispose1 = jest.fn()
    const dispose2 = jest.fn()
    const dispose3 = jest.fn()
    disposer.add(dispose1)
    disposer.add([dispose2, dispose3])
    disposer.dispose()
    expect(helloDispose1).toBeCalledTimes(1)
    expect(helloDispose2).toBeCalledTimes(1)
    expect(helloDispose3).toBeCalledTimes(1)
    expect((disposer as any).jar).toEqual({})
  })
})

describe('inBrowser', () => {
  test('无回调', () => {
    expect(vtils.inBrowser()).toBeTruthy()
  })
  test('有回调', () => {
    const callback = jest.fn()
    expect(vtils.inBrowser(callback)).toBeTruthy()
    expect(callback).toBeCalledTimes(1)
  })
})

describe('getType', () => {
  test('正确返回类型', () => {
    expect(vtils.getType('')).toBe('String')
    expect(vtils.getType(1)).toBe('Number')
    expect(vtils.getType({})).toBe('Object')
    expect(vtils.getType(Object.create(null))).toBe('Object')
    expect(vtils.getType(new Date())).toBe('Date')
    expect(vtils.getType(/X/)).toBe('RegExp')
    expect(vtils.getType(false)).toBe('Boolean')
    expect(vtils.getType(new Error('err'))).toBe('Error')
    expect(vtils.getType(null)).toBe('Null')
    expect(vtils.getType(undefined)).toBe('Undefined')
    expect(vtils.getType((function test() { return arguments })())).toBe('Arguments')
  })
})

describe('isString', () => {
  test('是', () => {
    expect(vtils.isString('')).toBeTruthy()
    expect(vtils.isString('hello')).toBeTruthy()
    expect(vtils.isString(String(1))).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isString({})).toBeFalsy()
    expect(vtils.isString(2)).toBeFalsy()
    expect(vtils.isString(/.+/)).toBeFalsy()
    expect(vtils.isString(null)).toBeFalsy()
  })
})

describe('isNumber', () => {
  test('是', () => {
    expect(vtils.isNumber(0)).toBeTruthy()
    expect(vtils.isNumber(Infinity)).toBeTruthy()
    expect(vtils.isNumber(NaN)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isNumber('3')).toBeFalsy()
    expect(vtils.isNumber({})).toBeFalsy()
    expect(vtils.isNumber(/.+/)).toBeFalsy()
    expect(vtils.isNumber(null)).toBeFalsy()
  })
})

describe('isFinite', () => {
  test('是', () => {
    expect(vtils.isFinite(0)).toBeTruthy()
    expect(vtils.isFinite(-99999999)).toBeTruthy()
    expect(vtils.isFinite(6666666666)).toBeTruthy()
    expect(vtils.isFinite(Number.MIN_VALUE)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isFinite(Infinity)).toBeFalsy()
    expect(vtils.isFinite(Number.NEGATIVE_INFINITY)).toBeFalsy()
    expect(vtils.isFinite(NaN)).toBeFalsy()
  })
})

describe('isInteger', () => {
  test('是', () => {
    expect(vtils.isInteger(0)).toBeTruthy()
    expect(vtils.isInteger(-99999999)).toBeTruthy()
    expect(vtils.isInteger(6666666666)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isInteger(1.2)).toBeFalsy()
    expect(vtils.isInteger(Infinity)).toBeFalsy()
    expect(vtils.isInteger(Number.NEGATIVE_INFINITY)).toBeFalsy()
    expect(vtils.isInteger(NaN)).toBeFalsy()
  })
})

describe('isNaN', () => {
  test('是', () => {
    expect(vtils.isNaN(NaN)).toBeTruthy()
    expect(vtils.isNaN(1 / ('x' as any))).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isNaN(0)).toBeFalsy()
    expect(vtils.isNaN(1.2)).toBeFalsy()
    expect(vtils.isNaN(Infinity)).toBeFalsy()
    expect(vtils.isNaN(Number.NEGATIVE_INFINITY)).toBeFalsy()
  })
})

describe('isBoolean', () => {
  test('是', () => {
    expect(vtils.isBoolean(true)).toBeTruthy()
    expect(vtils.isBoolean(false)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isBoolean('3')).toBeFalsy()
    expect(vtils.isBoolean({})).toBeFalsy()
    expect(vtils.isBoolean(/.+/)).toBeFalsy()
    expect(vtils.isBoolean(null)).toBeFalsy()
  })
})

describe('isArray', () => {
  test('是', () => {
    expect(vtils.isArray([])).toBeTruthy()
    expect(vtils.isArray(Array(1))).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isArray({})).toBeFalsy()
    expect(vtils.isArray(2)).toBeFalsy()
    expect(vtils.isArray(/.+/)).toBeFalsy()
    expect(vtils.isArray(null)).toBeFalsy()
  })
})

describe('isFunction', () => {
  test('是', () => {
    expect(vtils.isFunction(() => ({}))).toBeTruthy()
    expect(vtils.isFunction(now.getDate)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isFunction({})).toBeFalsy()
    expect(vtils.isFunction(2)).toBeFalsy()
    expect(vtils.isFunction(/.+/)).toBeFalsy()
    expect(vtils.isFunction(null)).toBeFalsy()
  })
})

describe('isObject', () => {
  test('是', () => {
    expect(vtils.isObject({})).toBeTruthy()
    expect(vtils.isObject(() => ({}))).toBeTruthy()
    expect(vtils.isObject(Date)).toBeTruthy()
    expect(vtils.isObject(/X/)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isObject('str')).toBeFalsy()
    expect(vtils.isObject(2)).toBeFalsy()
    expect(vtils.isObject(null)).toBeFalsy()
  })
})

describe('isPlainObject', () => {
  test('是', () => {
    expect(vtils.isPlainObject({})).toBeTruthy()
    expect(vtils.isPlainObject({ x: 1 })).toBeTruthy()
    expect(vtils.isPlainObject(Object.create(null))).toBeTruthy()
    expect(vtils.isPlainObject(Object({ x: 1 }))).toBeTruthy()
  })
  test('不是', () => {
    const MyCls = class Cls {}
    expect(vtils.isPlainObject('str')).toBeFalsy()
    expect(vtils.isPlainObject(2)).toBeFalsy()
    expect(vtils.isPlainObject(null)).toBeFalsy()
    expect(vtils.isPlainObject(Date)).toBeFalsy()
    expect(vtils.isPlainObject(() => ({}))).toBeFalsy()
    expect(vtils.isPlainObject(MyCls)).toBeFalsy()
  })
})

describe('isDate', () => {
  test('是', () => {
    expect(vtils.isDate(now)).toBeTruthy()
    expect(vtils.isDate(new Date())).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isDate('str')).toBeFalsy()
    expect(vtils.isDate(2)).toBeFalsy()
    expect(vtils.isDate(null)).toBeFalsy()
    expect(vtils.isDate({})).toBeFalsy()
  })
})

describe('isRegExp', () => {
  test('是', () => {
    expect(vtils.isRegExp(/x/)).toBeTruthy()
    expect(vtils.isRegExp(new RegExp('xxx'))).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isRegExp('str')).toBeFalsy()
    expect(vtils.isRegExp(2)).toBeFalsy()
    expect(vtils.isRegExp(null)).toBeFalsy()
    expect(vtils.isRegExp({})).toBeFalsy()
  })
})

describe('isNull', () => {
  test('是', () => {
    expect(vtils.isNull(null)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isNull(undefined)).toBeFalsy()
    expect(vtils.isNull('')).toBeFalsy()
    expect(vtils.isNull(0)).toBeFalsy()
    expect(vtils.isNull(false)).toBeFalsy()
    expect(vtils.isNull({})).toBeFalsy()
    expect(vtils.isNull(/X/)).toBeFalsy()
  })
})

describe('isUndefined', () => {
  test('是', () => {
    expect(vtils.isUndefined(undefined)).toBeTruthy()
    expect(vtils.isUndefined(void 0)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isUndefined('')).toBeFalsy()
    expect(vtils.isUndefined(0)).toBeFalsy()
    expect(vtils.isUndefined(false)).toBeFalsy()
    expect(vtils.isUndefined({})).toBeFalsy()
    expect(vtils.isUndefined(/X/)).toBeFalsy()
    expect(vtils.isUndefined(null)).toBeFalsy()
  })
})

describe('isNil', () => {
  test('是', () => {
    expect(vtils.isNil(null)).toBeTruthy()
    expect(vtils.isNil(undefined)).toBeTruthy()
    expect(vtils.isNil(void 0)).toBeTruthy()
  })
  test('不是', () => {
    expect(vtils.isNil('')).toBeFalsy()
    expect(vtils.isNil(0)).toBeFalsy()
    expect(vtils.isNil(false)).toBeFalsy()
    expect(vtils.isNil({})).toBeFalsy()
    expect(vtils.isNil(/X/)).toBeFalsy()
  })
})

describe('forOwn', () => {
  test('普通对象', () => {
    const arr: Array<[any, any]> = []
    vtils.forOwn({ x: 1, y: 2, 3: 3 }, (value, key) => {
      arr.push([key, value])
    })
    expect(arr).toContainEqual(['y', 2])
    expect(arr).toContainEqual(['x', 1])
    expect(arr).toContainEqual(['3', 3])
  })
  test('Object.create(null)', () => {
    const obj: { [key: string]: number } = Object.create(null)
    obj.x = 1
    obj.y = 2
    const arr: Array<[any, any]> = []
    vtils.forOwn(obj, (value, key) => {
      arr.push([key, value])
    })
    expect(arr).toContainEqual(['y', 2])
    expect(arr).toContainEqual(['x', 1])
  })
  test('返回 false 退出遍历', () => {
    const arr: Array<[any, any]> = []
    vtils.forOwn({ x: 1, y: 2, 3: 3 }, (_value, _key) => {
      return false
    })
    expect(arr).toEqual([])
  })
})

describe('parseCSSValue', () => {
  test('数字', () => {
    expect(vtils.parseCSSValue(12)).toEqual({
      value: 12,
      unit: 'px',
    })
    expect(vtils.parseCSSValue(-4)).toEqual({
      value: -4,
      unit: 'px',
    })
    expect(vtils.parseCSSValue('12')).toEqual({
      value: 12,
      unit: 'px',
    })
    expect(vtils.parseCSSValue('-4')).toEqual({
      value: -4,
      unit: 'px',
    })
  })
  test('CSS 值', () => {
    expect(vtils.parseCSSValue('12px')).toEqual({
      value: 12,
      unit: 'px',
    })
    expect(vtils.parseCSSValue('-4px')).toEqual({
      value: -4,
      unit: 'px',
    })
    expect(vtils.parseCSSValue('10%')).toEqual({
      value: 10,
      unit: '%',
    })
    expect(vtils.parseCSSValue('2.5em')).toEqual({
      value: 2.5,
      unit: 'em',
    })
    expect(vtils.parseCSSValue('.399999rem')).toEqual({
      value: 0.399999,
      unit: 'rem',
    })
  })
  test('默认单位', () => {
    expect(vtils.parseCSSValue(12, 'em')).toEqual({
      value: 12,
      unit: 'em',
    })
    expect(vtils.parseCSSValue('12', 'em')).toEqual({
      value: 12,
      unit: 'em',
    })
  })
})

describe('isEqualArray', () => {
  test('数组 == 数组', () => {
    expect(vtils.isEqualArray([], [])).toBeTruthy()
    expect(vtils.isEqualArray([1, now, '+'], [1, now, '+'])).toBeTruthy()
  })
  test('数组 != 数组', () => {
    expect(vtils.isEqualArray([], [1])).toBeFalsy()
    expect(vtils.isEqualArray([1, now, '+'], [1, now, '-'])).toBeFalsy()
    expect(vtils.isEqualArray([1, now, '+', '-'], [1, now, '+'])).toBeFalsy()
  })
  test('数组 != 其他', () => {
    expect(vtils.isEqualArray([], false as any)).toBeFalsy()
    expect(vtils.isEqualArray(['1', '2', '3'], '123' as any)).toBeFalsy()
  })
})

describe('shuffle', () => {
  test('非数组原样返回', () => {
    expect(vtils.shuffle(1 as any)).toEqual(1)
    expect(vtils.shuffle({} as any)).toEqual({})
    expect(vtils.shuffle(false as any)).toEqual(false)
  })
  test('打乱数组', () => {
    const arr1 = [1, 2, 3]
    for (let i = 0; i < 1000; i++) {
      expect([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ]).toContainEqual(vtils.shuffle(arr1))
    }
    const arr2 = [1, 2, 3, '&', null, /x/, () => {}]
    expect(vtils.shuffle(arr2).sort()).toEqual(arr2.sort())
  })
})

describe('fill', () => {
  const emptyArr = Array(3)
  const arr4 = [1, 2, 3, 4]
  test('默认 start 为 0，end 为 arr.length', () => {
    expect(vtils.fill(emptyArr, '*')).toEqual(['*', '*', '*'])
    expect(vtils.fill(arr4, '*')).toEqual(['*', '*', '*', '*'])
  })
  test('value 未指定则为 undefined', () => {
    expect(vtils.fill(emptyArr)).toEqual([undefined, undefined, undefined])
    expect(vtils.fill(arr4)).toEqual([undefined, undefined, undefined, undefined])
  })
  test('start 为正数', () => {
    expect(vtils.fill(emptyArr, '*', 1)).toEqual([undefined, '*', '*'])
    expect(vtils.fill(arr4, '*', 1)).toEqual([1, '*', '*', '*'])
  })
  test('start 为正数且大于或等于 arr.length', () => {
    expect(vtils.fill(arr4, '*', 4)).toEqual(arr4)
    expect(vtils.fill(arr4, '*', 5)).toEqual(arr4)
    expect(vtils.fill(arr4, '*', 60)).toEqual(arr4)
  })
  test('start 为负数', () => {
    expect(vtils.fill(emptyArr, '*', -1)).toEqual([undefined, undefined, '*'])
    expect(vtils.fill(arr4, '*', -2)).toEqual([1, 2, '*', '*'])
  })
  test('start 为负数且小于或等于 -arr.length', () => {
    expect(vtils.fill(emptyArr, '*', -3)).toEqual(['*', '*', '*'])
    expect(vtils.fill(arr4, '*', -4)).toEqual(['*', '*', '*', '*'])
    expect(vtils.fill(arr4, '*', -5)).toEqual(['*', '*', '*', '*'])
  })
  test('end 为正数', () => {
    expect(vtils.fill(emptyArr, '*', 1, 2)).toEqual([undefined, '*', undefined])
    expect(vtils.fill(arr4, '*', 1, 2)).toEqual([1, '*', 3, 4])
  })
  test('end 为正数且大于或等于 arr.length', () => {
    expect(vtils.fill(arr4, '*', 1, 4)).toEqual([1, '*', '*', '*'])
    expect(vtils.fill(arr4, '*', 1, 7)).toEqual([1, '*', '*', '*'])
    expect(vtils.fill(arr4, '*', 1, Infinity)).toEqual([1, '*', '*', '*'])
  })
  test('end 为负数', () => {
    expect(vtils.fill(emptyArr, '*', -2, -1)).toEqual([undefined, '*', undefined])
    expect(vtils.fill(arr4, '*', 1, -1)).toEqual([1, '*', '*', 4])
  })
  test('end 小于或等于 start', () => {
    expect(vtils.fill(emptyArr, '*', 3, 2)).toEqual([undefined, undefined, undefined])
    expect(vtils.fill(emptyArr, '*', -2, -3)).toEqual([undefined, undefined, undefined])
  })
  test('value 为函数', () => {
    expect(vtils.fill(emptyArr, (value, i) => i + 1)).toEqual([1, 2, 3])
  })
})

describe('has', () => {
  test('应只检查自身属性', () => {
    const obj: any = { x: 1, y: null }
    const fn = (): void => {}
    fn.x = 1
    Object.setPrototypeOf(fn, obj)
    expect(vtils.has(obj, 'x')).toBeTruthy()
    expect(vtils.has(obj, 'y')).toBeTruthy()
    expect(vtils.has(obj, 'toString')).toBeFalsy()
    expect(vtils.has(fn, 'x')).toBeTruthy()
    expect((fn as any).y).toBeNull()
    expect(vtils.has(fn, 'y')).toBeFalsy()
  })
})

describe('values', () => {
  test('对象', () => {
    expect(vtils.values({ now })).toEqual([now])
    expect(vtils.values({ 1: 2, x: 'y', t: null, ok: undefined }).sort()).toEqual([2, 'y', null, undefined].sort())
  })
  test('函数', () => {
    const fn = (): void => {}
    fn.x = 1
    expect(vtils.values(fn)).toEqual([1])
  })
})

describe('mapValues', () => {
  test('mapValues', () => {
    expect(vtils.mapValues({ x: 1, y: 2 }, value => ++value)).toEqual({
      x: 2,
      y: 3,
    })
  })
})

describe('inWechatMiniProgram', () => {
  test('inWechatMiniProgram', () => {
    const callback = jest.fn()
    expect(vtils.inWechatMiniProgram()).toBeFalsy()
    expect(vtils.inWechatMiniProgram(callback)).toBeFalsy()
    expect(callback).toBeCalledTimes(0)
  })
})

describe('inWechatWebview', () => {
  test('不在', () => {
    expect(vtils.inWechatWebview()).toBeFalsy()
  })
})

describe('pick', () => {
  test('pick', () => {
    const obj = {
      x: 1,
      y: 2,
      z: 'hello',
    }
    expect(vtils.pick(obj, [])).toEqual({})
    expect(vtils.pick(obj, ['x'])).toEqual({ x: 1 })
    expect(vtils.pick(obj, ['x', 'y'])).toEqual({ x: 1, y: 2 })
    expect(vtils.pick(obj, ['x', 'y', 'z'])).toEqual({ x: 1, y: 2, z: 'hello' })
  })
})

describe('omit', () => {
  test('omit', () => {
    const obj = {
      x: 1,
      y: 2,
      z: 'hello',
    }
    expect(vtils.omit(obj, [])).toEqual(obj)
    expect(vtils.omit(obj, ['x'])).toEqual({ y: 2, z: 'hello' })
    expect(vtils.omit(obj, ['x', 'y'])).toEqual({ z: 'hello' })
    expect(vtils.omit(obj, ['x', 'y', 'z'])).toEqual({})
  })
})

describe('upperCaseFirst', () => {
  test('非字符串原样返回', () => {
    [null, undefined, 0, false, true, NaN, {}, [], /ff/, () => {}].forEach(value => {
      expect(vtils.upperCaseFirst(value as any)).toBe(value)
    })
  })
  test('字符串首字母大写后返回', () => {
    expect(vtils.upperCaseFirst('ok')).toBe('Ok')
    expect(vtils.upperCaseFirst('Ok')).toBe('Ok')
    expect(vtils.upperCaseFirst('OK')).toBe('OK')
    expect(vtils.upperCaseFirst('ok no')).toBe('Ok no')
    expect(vtils.upperCaseFirst('1ok')).toBe('1ok')
    expect(vtils.upperCaseFirst('_ok')).toBe('_ok')
    expect(vtils.upperCaseFirst('')).toBe('')
  })
})

describe('isPromise', () => {
  test('是对象且有 then 方法就是', () => {
    expect(vtils.isPromise(new Promise(() => {}))).toBeTruthy()
    ;[{}, [], /f/, Date, () => {}].forEach(item => {
      (item as any).then = () => {}
      expect(vtils.isPromise(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    expect(vtils.isPromise(null)).toBeFalsy()
    expect(vtils.isPromise(1)).toBeFalsy()
    expect(vtils.isPromise({ Then: () => {} })).toBeFalsy()
    expect(vtils.isPromise(Promise)).toBeFalsy()
    expect(vtils.isPromise(/ddd/)).toBeFalsy()
  })
})

describe('formatCurrency', () => {
  test('默认选项：千分位逗号分隔，保留两位小数，四舍五入', () => {
    expect(vtils.formatCurrency(20.1)).toBe('20.10')
    expect(vtils.formatCurrency(2320.121)).toBe('2,320.12')
    expect(vtils.formatCurrency(2320.126)).toBe('2,320.13')
    expect(vtils.formatCurrency(840224)).toBe('840,224.00')
  })
  test('禁用千分位逗号分隔', () => {
    expect(vtils.formatCurrency(20.1, { thousands: false })).toBe('20.10')
    expect(vtils.formatCurrency(2320.121, { thousands: false })).toBe('2320.12')
    expect(vtils.formatCurrency(2320.126, { thousands: false })).toBe('2320.13')
    expect(vtils.formatCurrency(840224, { thousands: false })).toBe('840224.00')
  })
  test('保留 3 位小数', () => {
    expect(vtils.formatCurrency(20.1, { precision: 3 })).toBe('20.100')
    expect(vtils.formatCurrency(2320.121, { precision: 3 })).toBe('2,320.121')
    expect(vtils.formatCurrency(2320.126, { precision: 3 })).toBe('2,320.126')
    expect(vtils.formatCurrency(840224, { precision: 3 })).toBe('840,224.000')
  })
  test('不保留小数', () => {
    expect(vtils.formatCurrency(20.1, { precision: 0 })).toBe('20')
    expect(vtils.formatCurrency(2320.121, { precision: 0 })).toBe('2,320')
    expect(vtils.formatCurrency(2320.126, { precision: 0 })).toBe('2,320')
    expect(vtils.formatCurrency(840224, { precision: 0 })).toBe('840,224')
  })
  test('不处理小数', () => {
    expect(vtils.formatCurrency(20.1, { decimal: false })).toBe('20.1')
    expect(vtils.formatCurrency(2320.121, { decimal: false })).toBe('2,320.121')
    expect(vtils.formatCurrency(2320.126, { decimal: false })).toBe('2,320.126')
    expect(vtils.formatCurrency(840224, { decimal: false })).toBe('840,224')
  })
})

describe('isNumeric', () => {
  test('是', () => {
    [123, -22, '223', '-244.3', 0xFF, '0xFF', '8e5', 0o144, '0144'].forEach(item => {
      expect(vtils.isNumeric(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    [undefined, Infinity, true, null, NaN, {}, '', '7.2acdgs', '-0x42'].forEach(item => {
      expect(vtils.isNumeric(item)).toBeFalsy()
    })
  })
})

describe('Storage', () => {
  type StorageValues = {
    str: string,
    num: number,
    bool: boolean,
    obj: object,
    arr: any[],
  }
  type StorageKey = keyof StorageValues

  const storage = new vtils.Storage<StorageValues>(vtils.getBrowserLocalStorageDriver)

  const storageKeys: StorageKey[] = ['str', 'num', 'bool', 'obj', 'arr']

  test('键值不存在时返回 null', async () => {
    await Promise.all(
      storageKeys.map(async key => {
        expect(await storage.get(key)).toBeNull()
        expect(storage.getSync(key)).toBeNull()
      }),
    )
  })

  test('键值不存在且设置了默认值时返回默认值', async () => {
    await Promise.all(
      storageKeys.map(async key => {
        expect(await storage.get(key, 'dv')).toBe('dv')
        expect(storage.getSync(key, 'dv')).toBe('dv')
      }),
    )
  })

  test('键值存在时正确返回其值', async () => {
    const storageValues: StorageValues = {
      str: 'str',
      num: 100,
      bool: true,
      obj: { x: 1, y: '3' },
      arr: [3, { 2: 4 }, false, 'hello'],
    }
    await Promise.all(
      storageKeys.map(async (key, index) => {
        if (index % 2) {
          await storage.set({ [key]: storageValues[key] })
        } else {
          storage.setSync({ [key]: storageValues[key] })
        }
      }),
    )
    await Promise.all(
      storageKeys.map(async key => {
        expect(await storage.get(key)).toEqual(storageValues[key])
        expect(storage.getSync(key)).toEqual(storageValues[key])
      }),
    )
  })
})

describe('randomString', () => {
  test('ok', () => {
    const r: string[] = []
    for (let i = 0; i < 10000; i++) {
      const str = vtils.randomString()
      expect(r.indexOf(str) === -1).toBeTruthy()
      r.push(str)
    }
  })
})

describe('toDate', () => {
  console.warn = vtils.noop
  test('不传值返回当前时间', () => {
    expect(Math.abs(Math.round(vtils.toDate().getTime() / 1000) - Math.round(new Date().getTime() / 1000)) < 5).toBeTruthy()
  })
  test('传 null 返回非法时间', () => {
    expect(vtils.toDate(null).getTime()).toBeNaN()
  })
  test('传 Date 实例返回其克隆', () => {
    expect(vtils.toDate(now) === now).toBeFalsy()
    expect(vtils.toDate(now)).toEqual(now)
  })
  test('解析字符串', () => {
    ['2018-11-1', '2218-05-02', '1995-1-3 3:6', '1995-1-3 3:6:32', '1995-1-3 3:6:32.232'].forEach(item => {
      expect(vtils.toDate(item).getTime()).toBe(moment(item).toDate().getTime())
    })
  })
  test('解析时间戳，兼容 unix 时间戳', () => {
    ['1541049425978', 1541049425978, '1541049383', 1541049383].forEach(item => {
      expect(vtils.toDate(item).getTime()).toBe(moment(String(item).length === 10 ? +item * 1000 : +item).toDate().getTime())
    })
  })
})

describe('isChineseIDCardNumber', () => {
  test('是', () => {
    [
      '110101881101231',
      '110101198811014398',
      '11010119881101331X',
      '469001199208187005',
      '46900119920818180x',
    ].forEach(item => {
      expect(vtils.isChineseIDCardNumber(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    [
      '2000',
      '190101881101231',
      '110101881301231',
      '110101198811214398',
      '11010119881101331a',
      '469001399208187005',
      '46900119925818180x',
      '530627199508918277',
    ].forEach(item => {
      expect(vtils.isChineseIDCardNumber(item)).toBeFalsy()
    })
  })
})

describe('formatDate', () => {
  test('ok', () => {
    expect(vtils.formatDate('2018-09-20', 'yyyy年m月d日')).toBe('2018年9月20日')
    expect(vtils.formatDate('2018-09-20', 'yyyy年mm月d日')).toBe('2018年09月20日')
    expect(vtils.formatDate('2018-09-20', 'yyyy年mm月dd日')).toBe('2018年09月20日')
    expect(vtils.formatDate('2018-09-20', 'yy年mm月dd日')).toBe('18年09月20日')
    expect(vtils.formatDate('2018-09-20 3:12:9', 'yy年mm月dd日 hh:ii:ss')).toBe('18年09月20日 03:12:09')
    expect(vtils.formatDate(1541211914, 'yyyy年m月d日 h:i')).toBe(moment(1541211914 * 1000).format('YYYY年M月D日 H:m'))
    expect(vtils.formatDate(now, 'yyyy年m月d日 h:i:s')).toBe(moment(now).format('YYYY年M月D日 H:m:s'))
  })
  test('周几', () => {
    vtils.range(0, 7).forEach(i => {
      expect(vtils.formatDate(`2019-4-${22 + i}`, '周z')).toBe(`周${vtils.dayToZhou[i + 1]}`)
    })
  })
})

describe('startsWith', () => {
  test('是', () => {
    expect(vtils.startsWith('hello', 'he')).toBeTruthy()
    expect(vtils.startsWith('☺===', '☺')).toBeTruthy()
    expect(vtils.startsWith('455', '455')).toBeTruthy()
  })
  test('否', () => {
    expect(vtils.startsWith('hello', 'o')).toBeFalsy()
    expect(vtils.startsWith('☺===', '☺-')).toBeFalsy()
  })
})

describe('endsWith', () => {
  test('是', () => {
    expect(vtils.endsWith('hello', 'o')).toBeTruthy()
    expect(vtils.endsWith('☺===', '===')).toBeTruthy()
    expect(vtils.endsWith('455', '455')).toBeTruthy()
  })
  test('否', () => {
    expect(vtils.endsWith('hello', 'll')).toBeFalsy()
    expect(vtils.endsWith('☺===', '=.=')).toBeFalsy()
  })
})

describe('isUrl', () => {
  test('是', () => {
    [
      'http://foo.bar',
      'http://foo.bar:80',
      'http://foo.bar/oop?ddd#cc',
      'https://foo.bar',
      'http://39.137.107.98:22/hello',
    ].forEach(item => {
      expect(vtils.isUrl(item)).toBeTruthy()
    })
  })
  test('不是', () => {
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
      expect(vtils.isUrl(item)).toBeFalsy()
    })
  })
})

describe('isEmail', () => {
  test('是', () => {
    [
      'ee@foo.bar',
      'ee@foo.bar.ye',
      'ee.0@foo.1.xx.qq',
    ].forEach(item => {
      expect(vtils.isEmail(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    [
      'ee@foo.bar.y',
      '@foo.bar',
      'foo.bar',
    ].forEach(item => {
      expect(vtils.isEmail(item)).toBeFalsy()
    })
  })
})

describe('Validator', () => {
  test('基本可用', async () => {
    const v = new vtils.Validator({
      phone: {
        type: 'mobile',
        message: 'err',
      },
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({ valid: true })
    expect(await v.validate({ phone: '10086' })).toMatchObject({
      valid: false,
      key: 'phone',
      type: 'mobile',
    })
  })
  test('多个验证条件1', async () => {
    const v = new vtils.Validator({
      phone: [
        {
          type: 'mobile',
          message: 'err',
        },
        {
          custom: ({ value }) => value === '18087030178',
          message: '错啦',
        },
      ],
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({ valid: true })
    expect(await v.validate({ phone: '18087030179' })).toMatchObject({
      valid: false,
      key: 'phone',
      message: '错啦',
    })
  })
  test('多个验证条件2', async () => {
    const v = new vtils.Validator({ phone: { type: 'mobile', custom: ({ value }) => value === '18087030178', message: '错啦' } })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({ valid: true })
    expect(await v.validate({ phone: '18087030179' })).toMatchObject({
      valid: false,
      key: 'phone',
      message: '错啦',
    })
  })
  test('多个验证参数', async () => {
    const v = new vtils.Validator({
      phone: { type: 'mobile', message: 'err' },
      age: { custom: ({ value }) => value > 18, message: '18禁' },
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({ valid: true })
    expect(await v.validate({ age: 12 })).toMatchObject({
      valid: false,
      key: 'age',
      message: '18禁',
    })
    expect(await v.validate({ phone: '18087030178', age: 16 })).toMatchObject({
      valid: false,
      key: 'age',
      message: '18禁',
    })
    expect(await v.validate({ phone: '18087030178', age: 19 })).toMatchObject({ valid: true })
  })
  test('联合校验，如：两次密码一致', async () => {
    const v = new vtils.Validator({
      pass1: { required: true, message: '密码不能为空' },
      pass2: [
        { required: true, message: '重复密码不能为空' },
        { custom: ({ value, data }) => value === data.pass1, message: '两次密码不一致' },
      ],
    })
    expect(await v.validate({ pass1: 'hello', pass2: 'hell0' })).toMatchObject({
      valid: false,
      key: 'pass2',
      message: '两次密码不一致',
    })
    expect(await v.validate({ pass1: 'hello', pass2: 'hello' })).toMatchObject({ valid: true })
  })
  test('多余的 data 无影响', async () => {
    const v = new vtils.Validator({ phone: { type: 'mobile', message: 'err' } })
    expect(await v.validate({ phone: '18087030178', name: 'Jack', x: 'f' } as any)).toMatchObject({ valid: true })
  })
  test('综合测试', async () => {
    const v = new vtils.Validator({
      min: { min: 10, message: 'err' },
      max: { max: 100, message: 'err' },
      numRange: { type: 'number', min: 5, max: 10, message: 'err' },
      len: { len: 4, message: 'err' },
      re: { custom: /^\d+$/, message: 'err' },
      int: { type: 'integer', message: 'err' },
      required: { required: true, message: 'err' },
      fn: { custom: ({ value }) => value > 20, message: 'err' },
      async: { custom: () => new Promise(resolve => setTimeout(() => resolve(true), 500)), message: 'err' },
    })
    expect(await v.validate({ min: vtils.repeat(1, 9) })).toMatchObject({ valid: false })
    expect(await v.validate({ min: vtils.repeat(1, 9) })).toMatchObject({ valid: false })
    expect(await v.validate({ min: vtils.repeat(1, 10) })).toMatchObject({ valid: true })
    expect(await v.validate({ min: vtils.repeat(1, 11) })).toMatchObject({ valid: true })

    expect(await v.validate({ min: vtils.repeat(1, 9).split('') })).toMatchObject({ valid: false })
    expect(await v.validate({ min: vtils.repeat(1, 10).split('') })).toMatchObject({ valid: true })
    expect(await v.validate({ min: vtils.repeat(1, 11).split('') })).toMatchObject({ valid: true })

    expect(await v.validate({ max: vtils.repeat(1, 99) })).toMatchObject({ valid: true })
    expect(await v.validate({ max: vtils.repeat(1, 100) })).toMatchObject({ valid: true })
    expect(await v.validate({ max: vtils.repeat(1, 101) })).toMatchObject({ valid: false })

    expect(await v.validate({ max: vtils.repeat(1, 99).split('') })).toMatchObject({ valid: true })
    expect(await v.validate({ max: vtils.repeat(1, 100).split('') })).toMatchObject({ valid: true })
    expect(await v.validate({ max: vtils.repeat(1, 101).split('') })).toMatchObject({ valid: false })

    expect(await v.validate({ numRange: 1 })).toMatchObject({ valid: false })
    expect(await v.validate({ numRange: '1' })).toMatchObject({ valid: false })
    expect(await v.validate({ numRange: 11 })).toMatchObject({ valid: false })
    expect(await v.validate({ numRange: '11' })).toMatchObject({ valid: false })
    await Promise.all(vtils.range(5, 11).map(async item => {
      expect(await v.validate({ numRange: item })).toMatchObject({ valid: true })
      expect(await v.validate({ numRange: String(item) })).toMatchObject({ valid: true })
    }))

    expect(await v.validate({ len: vtils.repeat(1, 4) })).toMatchObject({ valid: true })
    expect(await v.validate({ len: vtils.repeat(1, 3) })).toMatchObject({ valid: false })

    expect(await v.validate({ len: vtils.repeat(1, 4).split('') })).toMatchObject({ valid: true })
    expect(await v.validate({ len: vtils.repeat(1, 3).split('') })).toMatchObject({ valid: false })

    expect(await v.validate({ re: '123' })).toMatchObject({ valid: true })
    expect(await v.validate({ re: '1233r' })).toMatchObject({ valid: false })

    expect(await v.validate({ int: 12 })).toMatchObject({ valid: true })
    expect(await v.validate({ int: '123' })).toMatchObject({ valid: true })
    expect(await v.validate({ int: '123.5' })).toMatchObject({ valid: false })
    expect(await v.validate({ int: 'hello' })).toMatchObject({ valid: false })

    expect(await v.validate({ required: '' })).toMatchObject({ valid: false })
    expect(await v.validate({ required: [] })).toMatchObject({ valid: false })
    expect(await v.validate({ required: '-' })).toMatchObject({ valid: true })

    expect(await v.validate({ fn: 1 })).toMatchObject({ valid: false })
    expect(await v.validate({ fn: 21 })).toMatchObject({ valid: true })

    expect(await v.validate({ async: ';;;;' })).toMatchObject({ valid: true })
  })
})

describe('isEmpty', () => {
  test('是', () => {
    [undefined, null, '', false, true, [], {}, Object.create(null)].forEach(item => {
      expect(vtils.isEmpty(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    [0, -1, ' ', /d/, () => {}, { x: null }, { y: undefined }, [undefined]].forEach(item => {
      expect(vtils.isEmpty(item)).toBeFalsy()
    })
  })
})

describe('range', () => {
  test('ok', () => {
    expect(vtils.range(2)).toEqual([0, 1])
    expect(vtils.range(2, 5)).toEqual([2, 3, 4])
    expect(vtils.range(5, 10, 2)).toEqual([5, 7, 9])
    expect(vtils.range(-3)).toEqual([-3, -2, -1])
  })
})

describe('times', () => {
  test('ok', () => {
    expect(vtils.times(4, () => 1)).toEqual([1, 1, 1, 1])
    expect(vtils.times(4, index => index)).toEqual([0, 1, 2, 3])
    expect(vtils.times(0, index => index)).toEqual([])
  })
})

describe('sample', () => {
  test('数组', () => {
    const arr: any[] = [1, '', false, null]
    vtils.times(1000, () => {
      expect(arr).toContainEqual(vtils.sample(arr))
    })
  })
  test('对象', () => {
    const obj: object = { '1': '3', 'x': null, '-': '@' }
    vtils.times(1000, () => {
      expect(vtils.values(obj)).toContainEqual(vtils.sample(obj))
    })
  })
})

describe('inNode', () => {
  test('ok', () => {
    expect(vtils.inNode()).toBeTruthy()
    const cb = jest.fn()
    vtils.inNode(cb)
    expect(cb).toBeCalledTimes(1)
  })
})

describe('keyBy', () => {
  const users = vtils.range(1, 100).map(i => ({
    id: i,
    name: 'name',
    age: i,
    likes: [
      'like1',
      'like2',
    ],
  }))
  test('函数', () => {
    const userByNamePlusId = vtils.keyBy(users, item => `${item.name}${item.id}`)
    Object.keys(userByNamePlusId).forEach(namePlusId => {
      expect(namePlusId).toMatch(/^name([1-9]|[1-9][0-9])$/)
    })
  })
})

describe('EventBus', () => {
  type EventBusList = {
    clickUrl: () => string,
    add: (a: number, b: number) => number,
    onceFn: () => void,
  }
  const bus = new vtils.EventBus<EventBusList>()

  test('emit 触发事件监听器且返回其值', () => {
    const onClickUrl = jest.fn(() => 'clicked')
    bus.on('clickUrl', onClickUrl)
    vtils.range(0, 1000).forEach(i => {
      expect(onClickUrl).toBeCalledTimes(i)
      expect(bus.emit('clickUrl')).toEqual(['clicked'])
    })
  })

  test('once 绑定的事件监听器只会触发一次', () => {
    const onceFn = jest.fn()
    expect(onceFn).toBeCalledTimes(0)
    bus.once('onceFn', onceFn)
    vtils.range(0, 1000).forEach(_i => {
      bus.emit('onceFn')
    })
    expect(onceFn).toBeCalledTimes(1)
  })

  test('可对同一事件绑定多个监听器，但相同的监听器只会绑定一次', () => {
    bus.on('add', (a, b) => {
      return a + b
    })
    const minus = (a: number, b: number): number => {
      return a - b
    }
    bus.on('add', minus)
    bus.on('add', minus)
    vtils.range(0, 1000).forEach(i => {
      expect(bus.emit('add', i, i + 1)).toEqual([i + i + 1, i - (i + 1)])
    })
  })

  test('未绑定的事件监听器返回空数组', () => {
    expect(bus.emit('notFound' as any)).toEqual([])
  })

  test('取消事件的所有监听器', () => {
    bus.off('add')
    expect(bus.emit('add', 1, 2)).toEqual([])
  })
})

describe('isHan', () => {
  test('是', () => {
    expect(vtils.isHan('我')).toBeTruthy()
    expect(vtils.isHan('我们')).toBeTruthy()
    expect(vtils.isHan('我的家')).toBeTruthy()
    expect(vtils.isHan('畫羣飃姉')).toBeTruthy()
  })
  test('否', () => {
    expect(vtils.isHan('我1')).toBeFalsy()
    expect(vtils.isHan('我,们')).toBeFalsy()
    expect(vtils.isHan('我，的家')).toBeFalsy()
    expect(vtils.isHan('畫羣飃#姉')).toBeFalsy()
  })
})

describe('isChineseName', () => {
  test('是', () => {
    expect(vtils.isChineseName('我们')).toBeTruthy()
    expect(vtils.isChineseName('我的家')).toBeTruthy()
    expect(vtils.isChineseName('畫羣飃姉')).toBeTruthy()
    expect(vtils.isChineseName('阿·不多')).toBeTruthy()
  })
  test('否', () => {
    expect(vtils.isChineseName('我')).toBeFalsy()
    expect(vtils.isChineseName('我1')).toBeFalsy()
    expect(vtils.isChineseName('我,们')).toBeFalsy()
    expect(vtils.isChineseName('我，的家')).toBeFalsy()
    expect(vtils.isChineseName('畫羣飃#姉')).toBeFalsy()
    expect(vtils.isChineseName('阿··不多')).toBeFalsy()
    expect(vtils.isChineseName('·不多')).toBeFalsy()
  })
})

describe('sleep', () => {
  test('ok', async () => {
    const time1 = new Date().getTime()
    await vtils.sleep(1000)
    const time2 = new Date().getTime()
    expect(time2 - time1 >= 1000).toBeTruthy()
  })
})

describe('objectToQueryString', () => {
  test('ok', () => {
    expect(vtils.objectToQueryString({ x: 11 })).toBe('x=11')
    expect(vtils.objectToQueryString({ '?': '.%/hello' })).toBe('%3F=.%25%2Fhello')
    const str = vtils.objectToQueryString({ 'x': 11, '?': '.%/hello' })
    expect(/x=11/.test(str)).toBeTruthy()
    expect(/%3F=\.%25%2Fhello/.test(str)).toBeTruthy()
  })
})

describe('last', () => {
  test('ok', () => {
    expect(vtils.last([1, 2, 3])).toBe(3)
    expect(vtils.last([1])).toBe(1)
    expect(vtils.last([])).toBe(undefined)
  })
})

describe('placeKitten', () => {
  test('ok', () => {
    expect(vtils.placeKitten(100)).toMatch(/100\/100/)
    expect(vtils.placeKitten(200, 100)).toMatch(/200\/100/)
  })
})

describe('padStart', () => {
  test('ok', () => {
    expect(vtils.padStart('1', 3, '0')).toBe('001')
    expect(vtils.padStart('abc', 6)).toBe('   abc')
    expect(vtils.padStart('abc', 6, '_-')).toBe('_-_abc')
    expect(vtils.padStart('abc', 3)).toBe('abc')
  })
})

describe('padEnd', () => {
  test('ok', () => {
    expect(vtils.padEnd('1', 3, '0')).toBe('100')
    expect(vtils.padEnd('abc', 6)).toBe('abc   ')
    expect(vtils.padEnd('abc', 6, '_-')).toBe('abc_-_')
    expect(vtils.padEnd('abc', 3)).toBe('abc')
  })
})

describe('pad', () => {
  test('ok', () => {
    expect(vtils.pad('1', 3, '0')).toBe('010')
    expect(vtils.pad('1', 4, '0')).toBe('0100')
    expect(vtils.pad('abc', 8)).toBe('  abc   ')
    expect(vtils.pad('abc', 8, '_-')).toBe('_-abc_-_')
    expect(vtils.pad('abc', 3)).toBe('abc')
  })
})

describe('onResize', () => {
  test('resize', () => {
    const fn = jest.fn()
    const off = vtils.onResize(fn)
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('orientationchange'))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    off()
    window.dispatchEvent(new Event('resize'))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
  })
  test('orientationchange', () => {
    (window as any).orientationchange = true
    const fn = jest.fn()
    const off = vtils.onResize(fn)
    window.dispatchEvent(new Event('orientationchange'))
    window.dispatchEvent(new Event('resize'))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    off()
    window.dispatchEvent(new Event('orientationchange'))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    delete (window as any).orientationchange
  })
})

describe('flexible', () => {
  test('ok', () => {
    vtils.flexible()
    document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`
  })
})

describe('sum', () => {
  test('ok', () => {
    expect(vtils.sum([4, 2, 8, 6])).toBe(20)
    expect(vtils.sum(4, 2, 8, 6)).toBe(20)
    expect(vtils.sum([4, 2], 8, [6])).toBe(20)
    expect(vtils.sum([4, 2], 8, [6], [])).toBe(20)
  })
})

describe('sumBy', () => {
  test('ok', () => {
    expect(vtils.sumBy([4, 2, 8, 6], item => item)).toBe(20)
    expect(vtils.sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], item => item.n)).toBe(20)
    expect(vtils.sumBy([vtils.range(0, 10), vtils.range(0, 5)], item => item.length)).toBe(15)
  })
})

describe('inRange', () => {
  test('开区间', () => {
    expect(vtils.inRange(5, 2, 6)).toBeTruthy()
    expect(vtils.inRange(2, 2, 6)).toBeFalsy()
    expect(vtils.inRange(6, 2, 6)).toBeFalsy()
    expect(vtils.inRange(7, 2, 6)).toBeFalsy()
    expect(vtils.inRange(2.0001, 2, 6)).toBeTruthy()
    expect(vtils.inRange(5.9999, 2, 6)).toBeTruthy()
  })
  test('闭区间', () => {
    expect(vtils.inRange(5, 2, 6, '[]')).toBeTruthy()
    expect(vtils.inRange(2, 2, 6, '[]')).toBeTruthy()
    expect(vtils.inRange(6, 2, 6, '[]')).toBeTruthy()
    expect(vtils.inRange(2.0001, 2, 6, '[]')).toBeTruthy()
    expect(vtils.inRange(5.9999, 2, 6, '[]')).toBeTruthy()
  })
  test('半开半闭区间', () => {
    expect(vtils.inRange(2, 2, 6, '(]')).toBeFalsy()
    expect(vtils.inRange(2, 2, 6, '[)')).toBeTruthy()
    expect(vtils.inRange(6, 2, 6, '(]')).toBeTruthy()
  })
})

describe('toUnixTimestamp', () => {
  test('ok', () => {
    [undefined, new Date(), '2018-2-2 5:3', 1548142169979].forEach(date => {
      expect(vtils.toUnixTimestamp(date)).toBe(moment(date).unix())
    })
  })
})

describe('formatDateDiff', () => {
  test('ok', () => {
    [
      ['2019-1-3', '2019-1-4', 'y年|m月|d日|h时|i分|s秒', '1日'],
      ['2018-1-3', '2019-1-4', 'y年|m月|d日|h时|i分|s秒', '1年1日'],
      // ['2018-1-3', '2019-1-4', 'd日', '366日'],
    ].map(([startDate, endDate, template, result]) => {
      expect(vtils.formatDateDiff(startDate, endDate, template)).toBe(result)
    })
  })
})

describe('chunk', () => {
  test('ok', () => {
    expect(vtils.chunk([1, 2], 0)).toEqual([[1], [2]])
    expect(vtils.chunk([1, 2], 1)).toEqual([[1], [2]])
    expect(vtils.chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
  })
  test('filler ok', () => {
    expect(vtils.chunk([1, 2, 3], 2, 4)).toEqual([[1, 2], [3, 4]])
    expect(vtils.chunk([1, 2, 3], 2, index => index)).toEqual([[1, 2], [3, 0]])
  })
})

describe('groupBy', () => {
  test('ok', () => {
    expect(vtils.groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: [4.2], 6: [6.1, 6.3] })
    expect(vtils.groupBy(['one', 'two', 'three'], item => item.length)).toEqual({ 3: ['one', 'two'], 5: ['three'] })
    expect(vtils.groupBy([{ i: 1 }, { i: 2 }, { i: 2, x: 0 }], item => item.i)).toEqual({ 1: [{ i: 1 }], 2: [{ i: 2 }, { i: 2, x: 0 }] })
  })
})

describe('column', () => {
  test('ok', () => {
    const records = [
      { id: 1, name: 'Jay', age: 20 },
      { id: 2, name: 'Baby', age: 1 },
      { id: 5, name: 'Yoyo', age: 100 },
    ]
    expect(vtils.column(records, 'id')).toEqual([1, 2, 5])
    expect(vtils.column(records, 'name')).toEqual(['Jay', 'Baby', 'Yoyo'])
    expect(vtils.column(records, 'name', 'id')).toEqual({
      1: 'Jay',
      2: 'Baby',
      5: 'Yoyo',
    })
  })
})

describe('assign', () => {
  test('ok', () => {
    const target = {}
    const source1 = { x: 1 }
    const source2 = { y: 2 }
    expect(vtils.assign(target, source1)).toEqual({ x: 1 })
    expect(target).toEqual({ x: 1 })
    expect(vtils.assign(source1, source2)).toEqual({ x: 1, y: 2 })
    expect(source1).toEqual({ x: 1, y: 2 })
    expect(vtils.assign(source2)).toEqual({ y: 2 })
    expect(vtils.assign(source2)).toBe(source2)
    expect(vtils.assign(source2, undefined)).toBe(source2)
  })
})

describe('wait', () => {
  test('ok', async () => {
    const time1 = new Date().getTime()
    await vtils.wait(1000)
    const time2 = new Date().getTime()
    expect(time2 - time1 >= 1000).toBeTruthy()
  })
})

describe('promiseSeries', () => {
  test('ok', async () => {
    const a = (): Promise<number> => Promise.resolve(1)
    const b = (): Promise<string> => Promise.resolve('2')
    const c = (): Promise<boolean> => Promise.resolve(false)
    const d = (): Promise<boolean> => Promise.reject('error')
    const pList = [a, b, c]
    expect(vtils.isPromise(vtils.promiseSeries(pList))).toBeTruthy()
    expect(await vtils.promiseSeries(pList)).toEqual([1, '2', false])
    expect(vtils.promiseSeries(pList.concat(d))).rejects.toBe('error')
  })
})

describe('includes', () => {
  test('ok', () => {
    expect(vtils.includes('124', '1')).toBeTruthy()
    expect(vtils.includes('124', '2')).toBeTruthy()
    expect(vtils.includes('124', '4')).toBeTruthy()
    expect(vtils.includes('124', '0')).toBeFalsy()
    expect(vtils.includes('124', '')).toBeTruthy()
    expect(vtils.includes([1, 2, '4'], 1)).toBeTruthy()
    expect(vtils.includes([1, 2, '4'], 2)).toBeTruthy()
    expect(vtils.includes([1, 2, '4'], '4')).toBeTruthy()
    expect(vtils.includes([1, 2, '4'], 4)).toBeFalsy()
    expect(vtils.includes([1, 2, '4'], '2')).toBeFalsy()
    expect(vtils.includes({ 1: 1, r: 2, 5: '4' }, 1)).toBeTruthy()
    expect(vtils.includes({ 1: 1, r: 2, 5: '4' }, 2)).toBeTruthy()
    expect(vtils.includes({ 1: 1, r: 2, 5: '4' }, '4')).toBeTruthy()
    expect(vtils.includes({ 1: 1, r: 2, 5: '4' }, '1')).toBeFalsy()
    expect(vtils.includes({ 1: 1, r: 2, 5: '4' }, '2')).toBeFalsy()
    expect(vtils.includes({ 1: 1, r: 2, 5: '4' }, 4)).toBeFalsy()
  })
})

describe('isIOS', () => {
  test('ok', () => {
    expect(vtils.isIOS()).toBeFalsy()
  })
})

describe('isLeapYear', () => {
  const leapYears = [
    // 1800s
    1804, 1808, 1812, 1816, 1820, 1824,
    1828, 1832, 1836, 1840, 1844, 1848,
    1852, 1856, 1860, 1864, 1868, 1872,
    1876, 1880, 1884, 1888, 1892, 1896,

    // 1900s
    1904, 1908, 1912, 1916, 1920, 1924,
    1928, 1932, 1936, 1940, 1944, 1948,
    1952, 1956, 1960, 1964, 1968, 1972,
    1976, 1980, 1984, 1988, 1992, 1996,

    // 2000s
    2000, 2004, 2008, 2012, 2016, 2020,
    2024, 2028, 2032, 2036, 2040, 2044,
    2048, 2052, 2056, 2060, 2064, 2068,
    2072, 2076, 2080, 2084, 2088, 2092,
    2096,
  ]
  test('should ok', () => {
    leapYears.forEach(year => {
      expect(vtils.isLeapYear(year)).toBeTruthy()
    })
  })
  test('should fail', () => {
    leapYears.forEach(year => {
      expect(vtils.isLeapYear(year - 1)).toBeFalsy()
      expect(vtils.isLeapYear(year + 1)).toBeFalsy()
      expect(vtils.isLeapYear(year + 2)).toBeFalsy()
    })
  })
})

describe('getDaysInMonth', () => {
  test('ok', () => {
    for (let year = 1800; year <= 3000; year++) {
      for (let month = 1; month <= 12; month++) {
        expect(
          vtils.getDaysInMonth(month, year),
        ).toBe(
          moment(new Date(year, month - 1, 1)).daysInMonth(),
        )
      }
    }
  })
})

describe('formatTemplate', () => {
  test('ok', () => {
    expect(vtils.formatTemplate('hello', { h: 78, l: '=-', o: '0' })).toBe('78e=-0')
    expect(vtils.formatTemplate('hello', { e: 'pyyy' })).toBe('hpyyyllo')
  })
})

describe('memoize', () => {
  const fn = jest.fn(() => 'ok')
  const memoizedFn = vtils.memoize(fn)

  test('调用原函数成功', () => {
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(1)
  })

  test('以同样的参数调用原函数将直接返回缓存的值', () => {
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(1)
  })

  test('可以修改缓存', () => {
    memoizedFn.cache.set(memoizedFn.lastCacheKey, 'hello')
    expect(memoizedFn()).toBe('hello')
    expect(fn).toBeCalledTimes(1)
  })

  test('可以获取缓存', () => {
    expect(memoizedFn.cache.get(memoizedFn.lastCacheKey)).toBe('hello')
  })

  test('可以删除缓存', () => {
    memoizedFn.cache.delete(memoizedFn.lastCacheKey)
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(2)
  })

  test('可以清空缓存', () => {
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(2)
    memoizedFn.cache.clear()
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(3)
  })

  test('环境不支持 Map 时依然可用', () => {
    (window as any).Map = null
    const fn = jest.fn(() => 'ok')
    const memoizedFn = vtils.memoize(fn)
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(1)
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(1)
    memoizedFn.cache.set(memoizedFn.lastCacheKey, 'hello')
    expect(memoizedFn()).toBe('hello')
    expect(fn).toBeCalledTimes(1)
    expect(memoizedFn.cache.get(memoizedFn.lastCacheKey)).toBe('hello')
    memoizedFn.cache.delete(memoizedFn.lastCacheKey)
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(2)
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(2)
    memoizedFn.cache.clear()
    expect(memoizedFn()).toBe('ok')
    expect(fn).toBeCalledTimes(3)
  })
})

describe('urlJoin', () => {
  test('ok', () => {
    expect(
      vtils.urlJoin('http://foo.bar', 'hello', '/world', '?id=1', '?q=hi&from=china', '&name=fjc', '#home'),
    ).toBe('http://foo.bar/hello/world?id=1&q=hi&from=china&name=fjc#home')
    expect(
      vtils.urlJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'),
    ).toBe('http://www.google.com/a/b/cd?foo=123&bar=foo')
  })
})

describe('isChinesePhoneNumber', () => {
  test('ok', () => {
    expect(vtils.isChinesePhoneNumber('110')).toBe(false)
    expect(vtils.isChinesePhoneNumber('120')).toBe(false)
    expect(vtils.isChinesePhoneNumber('10086')).toBe(false)
    expect(vtils.isChinesePhoneNumber('180800300800')).toBe(false)
    expect(vtils.isChinesePhoneNumber('16080030080')).toBe(true)
    expect(vtils.isChinesePhoneNumber('16080030080', true)).toBe(false)
    expect(vtils.isChineseMobilePhoneNumber('16080030080')).toBe(true)
    expect(vtils.isChineseMobilePhoneNumber('16080030080', true)).toBe(false)
    expect(vtils.isChinesePhoneNumber('12345678')).toBe(false)
    expect(vtils.isChinesePhoneNumber('87654321')).toBe(true)
    expect(vtils.isChinesePhoneNumber('87654321', true)).toBe(false)
    expect(vtils.isChineseLandlinePhoneNumber('87654321')).toBe(true)
    expect(vtils.isChineseLandlinePhoneNumber('87654321', true)).toBe(false)
    expect(vtils.isChinesePhoneNumber('10-87654321')).toBe(false)
    expect(vtils.isChinesePhoneNumber('010-87654321')).toBe(true)
    expect(vtils.isChinesePhoneNumber('010-7654321')).toBe(true)
    expect(vtils.isChineseMobilePhoneNumber('010-7654321')).toBe(false)
    expect(vtils.isChinesePhoneNumber('01-87654321')).toBe(false)
    expect(vtils.isChinesePhoneNumber('010-987654321')).toBe(false)
    expect(vtils.isChinesePhoneNumber('010-654321')).toBe(false)
  })
})

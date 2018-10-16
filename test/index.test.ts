import sinon from 'sinon'
import * as vtils from '../src'

const now = new Date()

describe('noop', () => {
  test('noop', () => {
    expect(vtils.noop()).toBeUndefined()
  })
})

describe('bindEvent', () => {
  test(`'click'`, () => {
    const div = document.createElement('div')
    const listener = sinon.fake()
    vtils.bindEvent(div, 'click', listener)
    expect(listener.called).toBeFalsy()
    div.click()
    expect(listener.callCount).toBe(1)
    div.click()
    expect(listener.callCount).toBe(2)
  })
  test(`'click tap'`, () => {
    const div = document.createElement('div')
    const listener = sinon.fake()
    vtils.bindEvent(div, 'click tap', listener)
    expect(listener.called).toBeFalsy()
    div.click()
    expect(listener.callCount).toBe(1)
    div.dispatchEvent(new CustomEvent('tap'))
    expect(listener.callCount).toBe(2)
  })
  test(`['click', 'tap']`, () => {
    const div = document.createElement('div')
    const listener = sinon.fake()
    vtils.bindEvent(div, ['click', 'tap'], listener)
    expect(listener.called).toBeFalsy()
    div.click()
    expect(listener.callCount).toBe(1)
    div.dispatchEvent(new CustomEvent('tap'))
    expect(listener.callCount).toBe(2)
  })
  test(`解绑`, () => {
    const div = document.createElement('div')
    const listener = sinon.fake()
    const unbind = vtils.bindEvent(div, 'click', listener)
    expect(listener.called).toBeFalsy()
    div.click()
    expect(listener.callCount).toBe(1)
    div.click()
    expect(listener.callCount).toBe(2)
    unbind()
    div.click()
    expect(listener.callCount).toBe(2)
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
    ['❥(ゝω・✿ฺ)※▓●²♠⑲Ⅲ∵molÇùㄡεətsフぽㅚ㉢д╢┉(๑╹◡╹)ﾉ"""', '4p2lKOOCnc+J44O74py/4Li6KeKAu+KWk+KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c+ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI=', '4p2lKOOCnc-J44O74py_4Li6KeKAu-KWk-KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c-ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI']
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
    data.forEach(([str, encodedStr, encodedUrlStr]) => {
      expect(vtils.base64UrlEncode(str)).toBe(encodedUrlStr)
    })
  })
  test('url decode', () => {
    data.forEach(([str, encodedStr, encodedUrlStr]) => {
      expect(vtils.base64UrlDecode(encodedUrlStr)).toBe(String(str))
    })
  })
})

describe('Disposer', () => {
  const disposer = new vtils.Disposer()
  const helloDispose1 = sinon.fake()
  const helloDispose2 = sinon.fake()
  const helloDispose3 = sinon.fake()
  test('add', () => {
    disposer.add('hello', helloDispose1)
    expect((disposer as any).jar.hello).toEqual([helloDispose1])
    disposer.add('hello', [helloDispose2, helloDispose3])
    expect((disposer as any).jar.hello).toEqual([helloDispose1, helloDispose2, helloDispose3])
  })
  test('dispose', () => {
    disposer.dispose('hello')
    expect(helloDispose1.calledOnce).toBeTruthy()
    expect(helloDispose2.calledOnce).toBeTruthy()
    expect(helloDispose3.calledOnce).toBeTruthy()
    expect((disposer as any).jar.hello).toBeUndefined()
  })
  test('disposeAll', () => {
    const dispose1 = sinon.fake()
    const dispose2 = sinon.fake()
    const dispose3 = sinon.fake()
    disposer.add('1', dispose1)
    disposer.add('2', dispose2)
    disposer.add('3', dispose3)
    disposer.disposeAll()
    expect(dispose1.calledOnce).toBeTruthy()
    expect(dispose2.calledOnce).toBeTruthy()
    expect(dispose3.calledOnce).toBeTruthy()
    expect((disposer as any).jar).toEqual({})
  })
})

describe('inBrowser', () => {
  test('无回调', () => {
    expect(vtils.inBrowser()).toBeTruthy()
  })
  test('有回调', () => {
    const callback = sinon.fake()
    expect(vtils.inBrowser(callback)).toBeTruthy()
    expect(callback.calledOnce).toBeTruthy()
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
    expect(vtils.getType(null)).toBe('Null')
    expect(vtils.getType(undefined)).toBe('Undefined')
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
    vtils.forOwn({ x: 1, y: 2, 3: 3 }, (value, key) => {
      return false
    })
    expect(arr).toEqual([])
  })
})

describe('supportPassiveEventListener', () => {
  test('不支持', () => {
    expect(vtils.supportPassiveEventListener()).toBeFalsy()
  })
})

describe('parseCssValue', () => {
  test('数字', () => {
    expect(vtils.parseCssValue(12)).toEqual({
      value: 12,
      unit: 'px'
    })
    expect(vtils.parseCssValue(-4)).toEqual({
      value: -4,
      unit: 'px'
    })
    expect(vtils.parseCssValue('12')).toEqual({
      value: 12,
      unit: 'px'
    })
    expect(vtils.parseCssValue('-4')).toEqual({
      value: -4,
      unit: 'px'
    })
  })
  test('CSS 值', () => {
    expect(vtils.parseCssValue('12px')).toEqual({
      value: 12,
      unit: 'px'
    })
    expect(vtils.parseCssValue('-4px')).toEqual({
      value: -4,
      unit: 'px'
    })
    expect(vtils.parseCssValue('10%')).toEqual({
      value: 10,
      unit: '%'
    })
    expect(vtils.parseCssValue('2.5em')).toEqual({
      value: 2.5,
      unit: 'em'
    })
    expect(vtils.parseCssValue('.399999rem')).toEqual({
      value: .399999,
      unit: 'rem'
    })
  })
  test('默认单位', () => {
    expect(vtils.parseCssValue(12, 'em')).toEqual({
      value: 12,
      unit: 'em'
    })
    expect(vtils.parseCssValue('12', 'em')).toEqual({
      value: 12,
      unit: 'em'
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

describe('cssTransform', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  test('cssTransform', () => {
    vtils.cssTransform(el, 'translateX(100px)', '.3s ease')
    expect(el.style.transform).toBe('translateX(100px)')
    expect(el.style.transition).toBe('transform .3s ease')
  })
  test('cssTransform.stop', () => {
    vtils.cssTransform.stop(el)
    expect(el.style.transition).toBe('none')
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
        [3, 2, 1]
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
})

describe('has', () => {
  test('应只检查自身属性', () => {
    const obj: any = { x: 1, y: null }
    const fn = () => {}
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

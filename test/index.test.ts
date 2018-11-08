import moment from 'moment'
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

describe('preventEventDefault', () => {
  test('阻止成功', done => {
    const div = document.createElement('div')
    div.onclick = e => {
      expect(e.defaultPrevented).toBeFalsy()
      vtils.preventEventDefault(e)
      expect(e.defaultPrevented).toBeTruthy()
      done()
    }
    div.click()
  })
})

describe('stopEventPropagation', () => {
  test('阻止成功', done => {
    const div = document.createElement('div')
    div.onclick = e => {
      expect(e.cancelBubble).toBeFalsy()
      vtils.stopEventPropagation(e)
      expect(e.cancelBubble).toBeTruthy()
      done()
    }
    div.click()
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

describe('values', () => {
  test('对象', () => {
    expect(vtils.values({ now })).toEqual([now])
    expect(
      vtils.values({ 1: 2, x: 'y', t: null, ok: undefined }).sort()
    ).toEqual(
      [2, 'y', null, undefined].sort()
    )
  })
  test('函数', () => {
    const fn = () => {}
    fn.x = 1
    expect(vtils.values(fn)).toEqual([1])
  })
})

describe('mapValues', () => {
  test('mapValues', () => {
    expect(vtils.mapValues({ x: 1, y: 2 }, value => ++value)).toEqual({
      x: 2,
      y: 3
    })
  })
})

describe('inWechatMiniProgram', () => {
  test('inWechatMiniProgram', () => {
    const callback = sinon.fake()
    expect(vtils.inWechatMiniProgram()).toBeFalsy()
    expect(vtils.inWechatMiniProgram(callback)).toBeFalsy()
    expect(callback.notCalled).toBeTruthy()
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
      z: 'hello'
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
      z: 'hello'
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
    expect(vtils.isPromise(new Promise(() => {}))).toBeTruthy();
    [{}, [], /f/, Date, () => {}].forEach(item => {
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

describe('storage', () => {
  test('ok', () => {
    expect(vtils.storage.get('hello')).toBeNull()
    vtils.storage.set('hello', 'world')
    expect(vtils.storage.get('hello')).toBe('world')
    vtils.storage.set('hello', null)
    expect(vtils.storage.get('hello')).toBeNull()
    vtils.storage.set('hello', undefined)
    expect(vtils.storage.get('hello')).toBeNull()
    vtils.storage.set('hello', [1, 2, 3])
    expect(vtils.storage.get('hello')).toEqual([1, 2, 3])
    vtils.storage.set('hello', false)
    expect(vtils.storage.get('hello')).toBe(false)
    vtils.storage.set('hello', 0)
    expect(vtils.storage.get('hello')).toBe(0)
    vtils.storage.remove('hello')
    expect(vtils.storage.get('hello')).toBeNull()
    vtils.storage.set('hello', '@-3-54=-3💮=-=')
    expect(vtils.storage.get('hello')).toBe('@-3-54=-3💮=-=')
    vtils.storage.clear()
    expect(vtils.storage.get('hello')).toBeNull()
  })
  test('过期时间', done => {
    expect(vtils.storage.get('time')).toBeNull()
    vtils.storage.set('time', '123')
    expect(vtils.storage.get('time')).toBe('123')
    vtils.storage.set('time', '1234', new Date().getTime() + 1000)
    expect(vtils.storage.get('time')).toBe('1234')
    setTimeout(() => {
      expect(vtils.storage.get('time')).toBe('1234')
    }, 900)
    setTimeout(() => {
      expect(vtils.storage.get('time')).toBeNull()
      done()
    }, 1001)
  })
  test('get 可设置默认值', () => {
    [
      vtils.randomString(),
      vtils.randomString(),
      vtils.randomString(),
      vtils.randomString(),
      vtils.randomString()
    ].forEach(item => {
      expect(vtils.storage.get(item)).toBeNull()
      expect(vtils.storage.get(item, item)).toBe(item)
    })
  })
  test('值支持函数返回值', () => {
    vtils.storage.set('===', () => 120)
    expect(vtils.storage.get('===')).toBe(120)
    expect(vtils.storage.get('====', () => 110)).toBe(110)
  })
  test('remember', () => {
    expect(vtils.storage.getRemember('jjj', () => 1)).toBe(1)
    expect(vtils.storage.get('jjj')).toBe(1)
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

describe('jsonp', () => {
  test('ok', () => {
    expect(
      vtils.isPromise(
        vtils.jsonp('https://jsonplaceholder.typicode.com/todos/1', { test: 1 })
      )
    ).toBeTruthy()
  })
})

describe('result', () => {
  test('非函数返回原值', () => {
    [null, undefined, 1, false, {}, [], /ddd/, new Date()].forEach(item => {
      expect(vtils.result(item)).toBe(item)
    })
  })
  test('函数返回函数执行结果', () => {
    [() => {}, (): any[] => [], () => 1, () => Date].forEach(item => {
      expect(vtils.result(item)).toEqual(item())
    })
  })
  test('函数可传参', () => {
    [(x: number): number => x, (x: number, y: number): number => x + y].forEach(item => {
      expect(vtils.result(item, 1, 2)).toEqual(item(1, 2))
    })
  })
})

describe('toDate', () => {
  console.warn = vtils.noop
  test('传 null 返回非法时间', () => {
    expect(vtils.toDate(null).getTime()).toBeNaN()
  })
  test('传 Date 实例返回其克隆', () => {
    expect(vtils.toDate(now) === now).toBeFalsy()
    expect(vtils.toDate(now)).toEqual(now)
  })
  test('解析字符串', () => {
    ['2018-11-1', '2218-05-02', '1995-1-3 3:6', '1995-1-3 3:6:32', '1995-1-3 3:6:32.232'].forEach(item => {
      expect(
        vtils.toDate(item).getTime()
      ).toBe(
        moment(item).toDate().getTime()
      )
    })
  })
  test('解析时间戳，兼容 unix 时间戳', () => {
    ['1541049425978', 1541049425978, '1541049383', 1541049383].forEach(item => {
      expect(
        vtils.toDate(item).getTime()
      ).toBe(
        moment(String(item).length === 10 ? +item * 1000 : +item).toDate().getTime()
      )
    })
  })
})

describe('toPath', () => {
  test('ok', () => {
    expect(vtils.toPath('ss.dee.3.dew.22')).toEqual(['ss', 'dee', '3', 'dew', '22'])
    expect(vtils.toPath('ss.dee[3].dew.22[we]')).toEqual(['ss', 'dee', '3', 'dew', '22', 'we'])
    expect(vtils.toPath('dee[3.2][hello.333]')).toEqual(['dee', '3.2', 'hello.333'])
  })
})

describe('isChineseIDCardNumber', () => {
  test('是', () => {
    [
      '110101881101231',
      '110101198811014398',
      '11010119881101331X',
      '469001199208187005',
      '46900119920818180x'
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
      '530627199508918277'
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
    expect(vtils.formatDate(1541211914, 'yyyy年m月d日 h:i')).toBe(
      moment(1541211914 * 1000).format('YYYY年M月D日 H:m')
    )
    expect(vtils.formatDate(now, 'yyyy年m月d日 h:i:s')).toBe(
      moment(now).format('YYYY年M月D日 H:m:s')
    )
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
      'http://foo.bar:8878878',
      'http://foo.bar/oop?ddd#cc',
      'https://foo.bar',
      'ftp://foo.bar'
    ].forEach(item => {
      expect(vtils.isUrl(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    [
      'wx://foo.bar',
      'foo.bar',
      'http://',
      'https://'
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
      'ee.0@foo.1.xx.qq'
    ].forEach(item => {
      expect(vtils.isEmail(item)).toBeTruthy()
    })
  })
  test('不是', () => {
    [
      'ee@foo.bar.y',
      '@foo.bar',
      'foo.bar'
    ].forEach(item => {
      expect(vtils.isEmail(item)).toBeFalsy()
    })
  })
})

describe('Validator', () => {
  test('基本可用', async () => {
    const v = new vtils.Validator({
      phone: { type: 'mobile' }
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({
      valid: true
    })
    expect(await v.validate({ phone: '10086' })).toMatchObject({
      valid: false,
      key: 'phone',
      type: 'mobile'
    })
  })
  test('多个验证条件1', async () => {
    const v = new vtils.Validator({
      phone: [
        { type: 'mobile' },
        { custom: ({ value }) => value === '18087030178', message: '错啦' }
      ]
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({
      valid: true
    })
    expect(await v.validate({ phone: '18087030179' })).toMatchObject({
      valid: false,
      key: 'phone',
      message: '错啦'
    })
  })
  test('多个验证条件2', async () => {
    const v = new vtils.Validator({
      phone: { type: 'mobile', custom: ({ value }) => value === '18087030178', message: '错啦' }
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({
      valid: true
    })
    expect(await v.validate({ phone: '18087030179' })).toMatchObject({
      valid: false,
      key: 'phone',
      message: '错啦'
    })
  })
  test('多个验证参数', async () => {
    const v = new vtils.Validator({
      phone: { type: 'mobile' },
      age: { custom: ({ value }) => value > 18, message: '18禁' }
    })
    expect(await v.validate({ phone: '18087030178' })).toMatchObject({
      valid: true
    })
    expect(await v.validate({ age: 12 })).toMatchObject({
      valid: false,
      key: 'age',
      message: '18禁'
    })
    expect(await v.validate({ phone: '18087030178', age: 16 })).toMatchObject({
      valid: false,
      key: 'age',
      message: '18禁'
    })
    expect(await v.validate({ phone: '18087030178', age: 19 })).toMatchObject({
      valid: true
    })
  })
  test('联合校验，如：两次密码一致', async () => {
    const v = new vtils.Validator({
      pass1: { required: true, message: '密码不能为空' },
      pass2: [
        { required: true, message: '重复密码不能为空' },
        { custom: ({ value, data }) => value === data.pass1, message: '两次密码不一致' }
      ]
    })
    expect(await v.validate({ pass1: 'hello', pass2: 'hell0' })).toMatchObject({
      valid: false,
      key: 'pass2',
      message: '两次密码不一致'
    })
    expect(await v.validate({ pass1: 'hello', pass2: 'hello' })).toMatchObject({
      valid: true
    })
  })
  test('多余的 data 无影响', async () => {
    const v = new vtils.Validator({
      phone: { type: 'mobile' }
    })
    expect(await v.validate({ phone: '18087030178', name: 'Jack', x: 'f' } as any)).toMatchObject({
      valid: true
    })
  })
  test('综合测试', async () => {
    const v = new vtils.Validator({
      min: { min: 10 },
      max: { max: 100 },
      len: { len: 4 },
      re: { custom: /^\d+$/ },
      int: { type: 'integer' },
      required: { required: true },
      async: { custom: () => new Promise(resolve => setTimeout(() => resolve(true), 500)) }
    })
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

// describe('request', () => {
//   test('ok', async () => {
//     const data: any = await vtils.request({
//       url: 'https://jsonplaceholder.typicode.com/todos/1'
//     })
//     expect(data.status).toBe(200)
//     expect(data.data.id).toBe(1)
//   })
// })

describe('get', () => {
  test('ok', () => {
    const obj: any = {
      x: 1,
      y: [1, 2, { z: null }],
      z: { we: 'hello' },
      '1.2': 1.2
    }
    expect(vtils.get(obj, 'x')).toBe(1)
    expect(vtils.get(obj, 'y[1]')).toBe(2)
    expect(vtils.get(obj, 'y[2].z')).toBe(null)
    expect(vtils.get(obj, 'z.we')).toBe('hello')
    expect(vtils.get(obj, 'z.we[1]')).toBe('e')
    expect(vtils.get(obj, 'z.we[1].xxx')).toBe(undefined)
    expect(vtils.get(obj, 'yyy')).toBe(undefined)
    expect(vtils.get(obj, 'yyy', 2013)).toBe(2013)
    expect(vtils.get(obj, '[1.2]')).toBe(1.2)
    expect(vtils.get(obj, '1.2')).toBe(undefined)
  })
})

describe('set', () => {
  test('ok', () => {
    const fn = () => {}
    const obj: any = {
      x: 1,
      y: [1, 2, { z: null }],
      z: { we: 'hello' },
      '1.2': 1.2,
      fn
    }
    vtils.set(obj, 'x', 2)
    vtils.set(obj, 'y[1]', '88')
    vtils.set(obj, 'y[2].z', [9])
    vtils.set(obj, 'z.we', {})
    vtils.set(obj, 'z.we[1]', null)
    vtils.set(obj, 'z.we[1].xxx', undefined)
    vtils.set(obj, 'yyy', '?')
    vtils.set(obj, '[1.2]', [])
    vtils.set(obj, '1.2', ' ')
    vtils.set(obj, 'fn.hello', 'world')
    expect(obj).toEqual({
      x: 2,
      y: [1, '88', { z: [9] }],
      z: { we: { 1: { xxx: undefined } } },
      yyy: '?',
      '1.2': [],
      1: {
        2: ' '
      },
      fn
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

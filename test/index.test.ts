import { SinonApi } from 'sinon'
const sinon: SinonApi = require('sinon') // tslint:disable-line
import * as vtils from '../src'

const now = new Date()

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

describe('isFunction', () => {
  test('是函数', () => {
    expect(vtils.isFunction(() => ({}))).toBeTruthy()
    expect(vtils.isFunction(now.getDate)).toBeTruthy()
  })
  test('不是函数', () => {
    expect(vtils.isFunction({})).toBeFalsy()
    expect(vtils.isFunction(2)).toBeFalsy()
    expect(vtils.isFunction(/.+/)).toBeFalsy()
    expect(vtils.isFunction(null)).toBeFalsy()
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

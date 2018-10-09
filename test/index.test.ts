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

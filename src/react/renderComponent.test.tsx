import React from 'react'
import { renderComponent } from './renderComponent'
import { wait } from '../utils'

describe('renderComponent', () => {
  describe('渲染正常', () => {
    function Test(props: { a?: number; b?: number }) {
      return !props.a && !props.b ? null : (
        <div className='test'>{(props.a || 0) + (props.b || 0)}</div>
      )
    }

    const {
      incrementalRerender,
      partialRerender,
      fullRerender,
      destroy,
    } = renderComponent(Test, { a: -2 })

    const getSum = () =>
      Number(document.querySelector('.test')?.innerHTML.trim() || -1)

    test('基本渲染', () => {
      expect(getSum()).toEqual(-2)
    })

    test('增量重渲染', () => {
      incrementalRerender({ a: 1 })
      expect(getSum()).toEqual(1)
      incrementalRerender({ b: 2 })
      expect(getSum()).toEqual(3)
      incrementalRerender({ a: 9 })
      expect(getSum()).toEqual(11)
      incrementalRerender({})
      expect(getSum()).toEqual(11)
    })

    test('部分重渲染', () => {
      partialRerender({ a: 1 })
      expect(getSum()).toEqual(1)
      partialRerender({ b: 2 })
      expect(getSum()).toEqual(0)
      partialRerender({ a: 9 })
      expect(getSum()).toEqual(9)
      partialRerender({})
      expect(getSum()).toEqual(-2)
    })

    test('全量重渲染', () => {
      fullRerender({ a: 1 })
      expect(getSum()).toEqual(1)
      fullRerender({ b: 2 })
      expect(getSum()).toEqual(2)
      fullRerender({ a: 9 })
      expect(getSum()).toEqual(9)
      fullRerender({})
      expect(getSum()).toEqual(-1)
    })

    test('销毁组件', () => {
      fullRerender({ a: 1 })
      expect(getSum()).toEqual(1)
      destroy()
      expect(getSum()).toEqual(-1)
    })
  })

  describe('逻辑正常', () => {
    function Test(props: { onClick?: () => any }) {
      return (
        <div className='test2' onClick={props.onClick}>
          1
        </div>
      )
    }
    const handleClick = jest.fn()
    const afterClick = jest.fn()
    const {
      incrementalRerender,
      partialRerender,
      fullRerender,
    } = renderComponent(Test, { onClick: handleClick }, { onClick: afterClick })

    test('注入回调正常', async () => {
      document.querySelector<HTMLDivElement>('.test2')?.click()
      await wait(0)
      expect(handleClick).toBeCalled().toBeCalledTimes(1)
      expect(afterClick).toBeCalled().toBeCalledTimes(1)
    })

    test('增量重渲染后注入回调正常', async () => {
      const handleClick2 = jest.fn()
      incrementalRerender({ onClick: handleClick2 })
      document.querySelector<HTMLDivElement>('.test2')?.click()
      await wait(0)
      expect(handleClick).toBeCalled().toBeCalledTimes(1)
      expect(afterClick).toBeCalled().toBeCalledTimes(2)
      expect(handleClick2).toBeCalled().toBeCalledTimes(1)
    })

    test('部分重渲染后注入回调正常', async () => {
      const handleClick3 = jest.fn()
      partialRerender({ onClick: handleClick3 })
      document.querySelector<HTMLDivElement>('.test2')?.click()
      await wait(0)
      expect(handleClick).toBeCalled().toBeCalledTimes(1)
      expect(afterClick).toBeCalled().toBeCalledTimes(3)
      expect(handleClick3).toBeCalled().toBeCalledTimes(1)
    })

    test('全量重渲染后注入回调正常', async () => {
      const handleClick4 = jest.fn()
      fullRerender({ onClick: handleClick4 })
      document.querySelector<HTMLDivElement>('.test2')?.click()
      await wait(0)
      expect(handleClick).toBeCalled().toBeCalledTimes(1)
      expect(afterClick).toBeCalled().toBeCalledTimes(4)
      expect(handleClick4).toBeCalled().toBeCalledTimes(1)
    })
  })
})

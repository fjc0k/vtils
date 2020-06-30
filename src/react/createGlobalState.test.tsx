import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { createGlobalState, CreateGlobalStateResult } from './createGlobalState'
import { render } from '@testing-library/react'

describe('createGlobalState', () => {
  describe('有初始值', () => {
    let useGlobalName: CreateGlobalStateResult<string>

    beforeEach(() => {
      useGlobalName = createGlobalState('')
    })

    test('getState 正常', () => {
      expect(useGlobalName.getState()).toBe('')
    })

    test('setState 正常', () => {
      useGlobalName.setState('Jay')
      expect(useGlobalName.getState()).toBe('Jay')
    })

    test('watchState 正常', () => {
      const cb = jest.fn()
      const off = useGlobalName.watchState(cb)
      useGlobalName.setState('Jay')
      expect(cb).toBeCalled().toBeCalledTimes(1).toBeCalledWith('Jay', '')
      useGlobalName.setState('Jay2')
      expect(cb).toBeCalled().toBeCalledTimes(2).toBeCalledWith('Jay2', 'Jay')
      off()
      expect(cb).toBeCalled().toBeCalledTimes(2).toBeCalledWith('Jay2', 'Jay')
    })

    test('跨组件状态共享正常', () => {
      const { result: result1 } = renderHook(() => useGlobalName())
      const { result: result2 } = renderHook(() => useGlobalName())
      const { result: result3 } = renderHook(() => useGlobalName())

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])

      act(() => result2.current[1]('Fong'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('Fong')

      act(() => result1.current[1](() => 'jj'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('jj')
    })
  })

  describe('无初始值', () => {
    let useGlobalName: CreateGlobalStateResult<string | undefined>

    beforeEach(() => {
      useGlobalName = createGlobalState()
    })

    test('getState 正常', () => {
      expect(useGlobalName.getState()).toBe(undefined)
    })

    test('setState 正常', () => {
      useGlobalName.setState('Jay')
      expect(useGlobalName.getState()).toBe('Jay')
    })

    test('watchState 正常', () => {
      const cb = jest.fn()
      const off = useGlobalName.watchState(cb)
      useGlobalName.setState('Jay')
      expect(cb)
        .toBeCalled()
        .toBeCalledTimes(1)
        .toBeCalledWith('Jay', undefined)
      useGlobalName.setState('Jay2')
      expect(cb).toBeCalled().toBeCalledTimes(2).toBeCalledWith('Jay2', 'Jay')
      off()
      expect(cb).toBeCalled().toBeCalledTimes(2).toBeCalledWith('Jay2', 'Jay')
    })

    test('跨组件状态共享正常', () => {
      const { result: result1 } = renderHook(() => useGlobalName())
      const { result: result2 } = renderHook(() => useGlobalName())
      const { result: result3 } = renderHook(() => useGlobalName())

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])

      act(() => result2.current[1]('Fong'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('Fong')

      act(() => result1.current[1](() => 'jj'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('jj')
    })
  })

  describe('bug', () => {
    test('延后注册的订阅不能获取最新值', async () => {
      const useGlobalName = createGlobalState('o')

      function Child() {
        const [name] = useGlobalName()
        return <div id='child'>{name}</div>
      }

      function Parent() {
        const [name] = useGlobalName()
        return (
          <>
            <div id='parent'>{name}</div>
            {name === 'ok' && <Child />}
          </>
        )
      }

      const { asFragment } = render(<Parent />)
      expect(asFragment()).toMatchSnapshot('只有 parent 且值为 o')
      useGlobalName.setState('ok')
      expect(asFragment()).toMatchSnapshot('有 parent 和 child 且值都为 ok')
    })
  })
})

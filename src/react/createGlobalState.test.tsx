import React, { useCallback } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { createGlobalState, CreateGlobalStateResult } from './createGlobalState'
import { render } from '@testing-library/react'
import { wait } from '../utils'

describe('createGlobalState', () => {
  describe('默认 actions', () => {
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

      test('watchStateImmediate 正常', () => {
        const cb = jest.fn()
        const off = useGlobalName.watchStateImmediate(cb)
        expect(cb).toBeCalled().toBeCalledTimes(1).toBeCalledWith('', undefined)
        useGlobalName.setState('Jay')
        expect(cb).toBeCalled().toBeCalledTimes(2).toBeCalledWith('Jay', '')
        useGlobalName.setState('Jay2')
        expect(cb).toBeCalled().toBeCalledTimes(3).toBeCalledWith('Jay2', 'Jay')
        off()
        expect(cb).toBeCalled().toBeCalledTimes(3).toBeCalledWith('Jay2', 'Jay')
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

  describe('自定义 result', () => {
    describe('有初始值', () => {
      let useGlobalName: CreateGlobalStateResult<
        string,
        {
          state: string
          fetch(nextState: string): Promise<any>
        }
      >

      beforeEach(() => {
        useGlobalName = createGlobalState('', ({ state, setState }) => {
          const fetch = useCallback(async (nextState: string) => {
            await wait(10)
            setState(nextState)
          }, [])
          return { state, fetch }
        })
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

      test('跨组件状态共享正常', async () => {
        const { result: result1 } = renderHook(() => useGlobalName())
        const { result: result2 } = renderHook(() => useGlobalName())
        const { result: result3 } = renderHook(() => useGlobalName())

        expect(useGlobalName.getState())
          .toBe(result1.current.state)
          .toBe(result2.current.state)
          .toBe(result3.current.state)

        await act(() => result2.current.fetch('Fong'))

        expect(useGlobalName.getState())
          .toBe(result1.current.state)
          .toBe(result2.current.state)
          .toBe(result3.current.state)
          .toBe('Fong')

        await act(() => result1.current.fetch('jj'))

        expect(useGlobalName.getState())
          .toBe(result1.current.state)
          .toBe(result2.current.state)
          .toBe(result3.current.state)
          .toBe('jj')
      })
    })

    describe('无初始值', () => {
      let useGlobalName: CreateGlobalStateResult<
        string | undefined,
        {
          state: string | undefined
          fetch(nextState: string): Promise<any>
        }
      >

      beforeEach(() => {
        useGlobalName = createGlobalState(({ state, setState }) => {
          const fetch = useCallback(async (nextState: string) => {
            await wait(10)
            setState(nextState)
          }, [])
          return { state, fetch }
        })
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

      test('跨组件状态共享正常', async () => {
        const { result: result1 } = renderHook(() => useGlobalName())
        const { result: result2 } = renderHook(() => useGlobalName())
        const { result: result3 } = renderHook(() => useGlobalName())

        expect(useGlobalName.getState())
          .toBe(result1.current.state)
          .toBe(result2.current.state)
          .toBe(result3.current.state)

        await act(() => result2.current.fetch('Fong'))

        expect(useGlobalName.getState())
          .toBe(result1.current.state)
          .toBe(result2.current.state)
          .toBe(result3.current.state)
          .toBe('Fong')

        await act(() => result1.current.fetch('jj'))

        expect(useGlobalName.getState())
          .toBe(result1.current.state)
          .toBe(result2.current.state)
          .toBe(result3.current.state)
          .toBe('jj')
      })
    })

    describe('bug', () => {
      test('延后注册的订阅不能获取最新值', async () => {
        const useGlobalName = createGlobalState('o', ({ state, setState }) => {
          const fetch = useCallback(async (nextState: string) => {
            await wait(10)
            setState(nextState)
          }, [])
          return { name: state, fetch }
        })

        function Child() {
          const { name } = useGlobalName()
          return <div id='child'>{name}</div>
        }

        function Parent() {
          const { name } = useGlobalName()
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

  describe('对象', () => {
    let useGlobalObj: CreateGlobalStateResult<{ x: number; y: string }>

    beforeEach(() => {
      useGlobalObj = createGlobalState({ x: 1, y: '2' })
    })

    test('setState', () => {
      expect(useGlobalObj.getState()).toEqual({ x: 1, y: '2' })
      useGlobalObj.setState({ x: 2, y: '3' })
      expect(useGlobalObj.getState()).toEqual({ x: 2, y: '3' })
    })

    test('setStatePartial', () => {
      expect(useGlobalObj.getState()).toEqual({ x: 1, y: '2' })
      useGlobalObj.setStatePartial({})
      expect(useGlobalObj.getState()).toEqual({ x: 1, y: '2' })
      useGlobalObj.setStatePartial({ y: '6' })
      expect(useGlobalObj.getState()).toEqual({ x: 1, y: '6' })
      useGlobalObj.setStatePartial({ x: 33 })
      expect(useGlobalObj.getState()).toEqual({ x: 33, y: '6' })
      useGlobalObj.setStatePartial({ x: 2, y: '3' })
      expect(useGlobalObj.getState()).toEqual({ x: 2, y: '3' })
      useGlobalObj.setStatePartial(_ => ({ x: _.x + 10 }))
      expect(useGlobalObj.getState()).toEqual({ x: 12, y: '3' })
    })
  })
})

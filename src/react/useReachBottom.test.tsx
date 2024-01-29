import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import React, { useEffect } from 'react'
import { wait } from '../utils/index.ts'
import { useReachBottom } from './useReachBottom.ts'

Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  configurable: true,
  get: function () {
    return this._scrollHeight || 0
  },
  set(val) {
    this._scrollHeight = val
  },
})

Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  get: function () {
    return this._clientHeight || 0
  },
  set(val) {
    this._clientHeight = val
  },
})

describe('useReachBottom', () => {
  describe('window', () => {
    test('未到达底部，不触发(offset 默认为 0)', async () => {
      const handleReachBottom = jest.fn()

      renderHook(() => useReachBottom(handleReachBottom))

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(1)

      // @ts-ignore
      document.documentElement.scrollHeight = window.innerHeight * 2
      document.documentElement.scrollTop = window.innerHeight - 1

      window.dispatchEvent(new Event('scroll'))

      await wait(300)

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(1)
    })

    test('未到达底部，但通过改变 offset 使其触发', async () => {
      const handleReachBottom = jest.fn()

      renderHook(() => useReachBottom(handleReachBottom, 1))

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(1)

      // @ts-ignore
      document.documentElement.scrollHeight = window.innerHeight * 2
      document.documentElement.scrollTop = window.innerHeight - 1

      window.dispatchEvent(new Event('scroll'))

      await wait(300)

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(2)
    })

    test('到达底部，触发', async () => {
      const handleReachBottom = jest.fn()

      renderHook(() => useReachBottom(handleReachBottom, 0))

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(1)

      // @ts-ignore
      document.documentElement.scrollHeight = window.innerHeight * 2
      document.documentElement.scrollTop = window.innerHeight + 1

      window.dispatchEvent(new Event('scroll'))

      await wait(300)

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(2)
    })
  })

  describe('特定元素', () => {
    function ScrollArea(props: {
      offset: number
      onReachBottom: () => any
      onMounted: (el: HTMLDivElement) => any
    }) {
      const ref = useReachBottom<HTMLDivElement>(
        props.onReachBottom,
        props.offset,
      )
      useEffect(() => {
        props.onMounted(ref.current!)
      }, [])
      return <div ref={ref} />
    }

    test('未到达底部，不触发', async () => {
      const handleReachBottom = jest.fn()
      render(
        <ScrollArea
          offset={0}
          onReachBottom={handleReachBottom}
          onMounted={el => {
            // @ts-ignore
            el.scrollHeight = 1000
            // @ts-ignore
            el.clientHeight = 600
            el.scrollTop = 300
            el.dispatchEvent(new Event('scroll'))
          }}
        />,
      )
      await wait(300)
      expect(handleReachBottom).toBeCalled().toBeCalledTimes(1)
    })

    test('未到达底部，但通过改变 offset 使其触发', async () => {
      const handleReachBottom = jest.fn()
      render(
        <ScrollArea
          offset={100}
          onReachBottom={handleReachBottom}
          onMounted={el => {
            // @ts-ignore
            el.scrollHeight = 1000
            // @ts-ignore
            el.clientHeight = 600
            el.scrollTop = 300
            el.dispatchEvent(new Event('scroll'))
          }}
        />,
      )

      await wait(300)

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(2)
    })

    test('到达底部，触发', async () => {
      const handleReachBottom = jest.fn()
      render(
        <ScrollArea
          offset={0}
          onReachBottom={handleReachBottom}
          onMounted={el => {
            // @ts-ignore
            el.scrollHeight = 1000
            // @ts-ignore
            el.clientHeight = 600
            el.scrollTop = 420
            el.dispatchEvent(new Event('scroll'))
          }}
        />,
      )

      await wait(300)

      expect(handleReachBottom).toBeCalled().toBeCalledTimes(2)
    })
  })
})

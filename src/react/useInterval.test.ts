import { act, renderHook } from '@testing-library/react-hooks'
import { useInterval } from './useInterval'
import { useState } from 'react'
import { wait } from '../utils'

describe('useInterval', () => {
  test('通过 stop/start 控制', async () => {
    let i = 0
    const { result } = renderHook(() => useInterval(() => i++, 20))
    expect(result.current[0]).toBe(0)
    await wait(20)
    expect(result.current[0]).toBe(1)
    result.current[1].stop()
    await wait(40)
    expect(result.current[0]).toBe(1)
    result.current[1].start()
    expect(result.current[0]).toBe(2)
    await wait(20)
    expect(result.current[0]).toBe(3)
  })

  test('通过 delay 控制', async () => {
    let i = 0
    const { result } = renderHook(() => {
      const [delay, setDelay] = useState<any>(20)
      return { interval: useInterval(() => i++, delay), setDelay }
    })
    expect(result.current.interval[0]).toBe(0)
    await wait(20)
    expect(result.current.interval[0]).toBe(1)
    act(() => result.current.setDelay(false))
    await wait(40)
    expect(result.current.interval[0]).toBe(1)
    act(() => result.current.setDelay(20))
    await wait(0)
    expect(result.current.interval[0]).toBe(2)
    await wait(20)
    expect(result.current.interval[0]).toBe(3)
  })

  test('支持 duration', async () => {
    let i = 0
    renderHook(() => {
      return useInterval(() => i++, 10, 21)
    })
    await wait(50)
    expect(i).toBe(2)
  })

  test('支持 start 设置 delay, duration', async () => {
    let i = 0
    const { result } = renderHook(() => {
      return useInterval(() => i++, null)[1]
    })
    expect(i).toBe(0)
    act(() => result.current.start(10, 42))
    expect(i).toBe(1)
    await wait(12)
    expect(i).toBe(2)
    await wait(60)
    expect(i).toBe(4)
  })
})

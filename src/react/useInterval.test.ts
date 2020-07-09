import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
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
    const { result, waitForNextUpdate } = renderHook(() => {
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
    await waitForNextUpdate()
    expect(result.current.interval[0]).toBe(2)
    await wait(20)
    expect(result.current.interval[0]).toBe(3)
  })
})

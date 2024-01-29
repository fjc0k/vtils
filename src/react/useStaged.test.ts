import { act, renderHook } from '@testing-library/react-hooks'
import { useState } from 'react'
import { useStaged } from './useStaged.ts'

describe('useStaged', () => {
  test('表现正常', () => {
    const { result } = renderHook(() => {
      const [counter, setCounter] = useState(1)
      const [stagedCounter, stagedCounterActions] = useStaged(
        counter,
        setCounter,
      )
      return {
        counter,
        setCounter,
        stagedCounter,
        stagedCounterActions,
      }
    })
    expect(result.current.counter).toBe(1)
    expect(result.current.stagedCounter).toBe(1)

    act(() => result.current.stagedCounterActions.set(2))
    expect(result.current.counter).toBe(1)
    expect(result.current.stagedCounter).toBe(2)

    act(() => result.current.stagedCounterActions.set(3))
    expect(result.current.counter).toBe(1)
    expect(result.current.stagedCounter).toBe(3)

    act(() => result.current.stagedCounterActions.commit())
    expect(result.current.counter).toBe(3)
    expect(result.current.stagedCounter).toBe(3)

    act(() => result.current.setCounter(0))
    expect(result.current.counter).toBe(0)
    expect(result.current.stagedCounter).toBe(0)

    act(() => result.current.stagedCounterActions.set(300))
    expect(result.current.counter).toBe(0)
    expect(result.current.stagedCounter).toBe(300)

    act(() => result.current.stagedCounterActions.reset())
    expect(result.current.counter).toBe(0)
    expect(result.current.stagedCounter).toBe(0)
  })
})

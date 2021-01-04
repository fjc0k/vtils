import { act, renderHook } from '@testing-library/react-hooks'
import { useStaged } from './useStaged'
import { useState } from 'react'

describe('useStaged', () => {
  test('表现正常', () => {
    const { result } = renderHook(() => {
      const [counter, setCounter] = useState(1)
      const [stagedCounter, setStagedCounter, commitStagedCounter] = useStaged(
        counter,
        setCounter,
      )
      return {
        counter,
        setCounter,
        stagedCounter,
        setStagedCounter,
        commitStagedCounter,
      }
    })
    expect(result.current.counter).toBe(1)
    expect(result.current.stagedCounter).toBe(1)

    act(() => result.current.setStagedCounter(2))
    expect(result.current.counter).toBe(1)
    expect(result.current.stagedCounter).toBe(2)

    act(() => result.current.setStagedCounter(3))
    expect(result.current.counter).toBe(1)
    expect(result.current.stagedCounter).toBe(3)

    act(() => result.current.commitStagedCounter())
    expect(result.current.counter).toBe(3)
    expect(result.current.stagedCounter).toBe(3)

    act(() => result.current.setCounter(0))
    expect(result.current.counter).toBe(0)
    expect(result.current.stagedCounter).toBe(0)
  })
})

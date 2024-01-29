import { useCallback } from 'react'
import { useLatest } from 'react-use'
import { useStateWithDeps } from './useStateWithDeps.ts'

/**
 * 暂存状态。
 */
export function useStaged<T>(
  value: T,
  setValue: (value: T) => void,
): [
  T,
  {
    set: (value: T) => void
    commit: () => void
    reset: () => void
  },
] {
  const [stagedState, setStagedState] = useStateWithDeps(value, [value])
  const valueRef = useLatest(value)
  const setValueRef = useLatest(setValue)
  const stagedStateRef = useLatest(stagedState)
  const commitStagedState = useCallback(() => {
    setValueRef.current(stagedStateRef.current)
  }, [])
  const resetStagedState = useCallback(() => {
    setStagedState(valueRef.current)
  }, [])
  return [
    stagedState,
    {
      set: setStagedState,
      commit: commitStagedState,
      reset: resetStagedState,
    },
  ]
}

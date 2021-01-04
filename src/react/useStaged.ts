import { useCallback } from 'react'
import { useLatest } from 'react-use'
import { useStateWithDeps } from './useStateWithDeps'

/**
 * 暂存状态。
 */
export function useStaged<T extends any, F extends (value: T) => void>(
  value: T,
  setValue: F,
): [T, F, () => void] {
  const [stagedState, setStagedState] = useStateWithDeps(value, [value])
  const setValueRef = useLatest(setValue)
  const stagedStateRef = useLatest(stagedState)
  const commitStagedState = useCallback(() => {
    setValueRef.current(stagedStateRef.current)
  }, [])
  return [stagedState, setStagedState, commitStagedState] as any
}

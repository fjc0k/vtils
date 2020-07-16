import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useLatest, useUpdateEffect } from 'react-use'

export type UseLocalStorageResult<S> = readonly [
  S,
  Dispatch<SetStateAction<S>>,
  () => void,
]

export function useLocalStorage<S>(
  key: string,
): UseLocalStorageResult<S | undefined>

export function useLocalStorage<S>(
  key: string,
  initialState: S,
): UseLocalStorageResult<S>

export function useLocalStorage<S>(
  key: string,
  initialState?: S,
): UseLocalStorageResult<S | undefined> {
  const getLocalStorageItem = useCallback(() => {
    try {
      const data = localStorage.getItem(key)
      if (data != null) {
        return JSON.parse(data)
      }
      return initialState
    } catch {
      return initialState
    }
  }, [key, initialState])

  const [state, setState] = useState(getLocalStorageItem)

  const latestKey = useLatest(key)
  const latestInitialState = useLatest(initialState)
  const latestState = useLatest(state)

  useUpdateEffect(() => {
    setState(getLocalStorageItem())
  }, [key])

  const set: UseLocalStorageResult<S | undefined>[1] = useCallback(
    nextState => {
      if (typeof nextState === 'function') {
        nextState = (nextState as any)(latestState.current)
      }
      setState(nextState)
      localStorage.setItem(latestKey.current, JSON.stringify(nextState))
    },
    [],
  )

  const reset: UseLocalStorageResult<S | undefined>[2] = useCallback(() => {
    localStorage.removeItem(latestKey.current)
    setState(latestInitialState.current)
  }, [])

  return [state, set, reset]
}

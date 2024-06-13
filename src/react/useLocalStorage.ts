import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useLatest, useUpdateEffect } from 'react-use'
import { inMiniProgram } from '../utils'

const mp = inMiniProgram()
const storage: {
  get: (key: string) => string | null
  set: (key: string, value: string) => void
  remove: (key: string) => void
} = mp
  ? {
      get: key => mp.getStorageSync(key),
      set: (key, value) => mp.setStorageSync(key, value),
      remove: key => mp.removeStorageSync(key),
    }
  : {
      get: key => localStorage.getItem(key),
      set: (key, value) => localStorage.setItem(key, value),
      remove: key => localStorage.removeItem(key),
    }

export type UseLocalStorageResult<S> = readonly [
  S,
  Dispatch<SetStateAction<S>>,
  () => void,
]

/**
 * 已兼容小程序。
 */
export function useLocalStorage<S>(
  key: string,
): UseLocalStorageResult<S | undefined>

/**
 * 已兼容小程序。
 */
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
      const data = storage.get(key)
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
      storage.set(latestKey.current, JSON.stringify(nextState))
    },
    [],
  )

  const reset: UseLocalStorageResult<S | undefined>[2] = useCallback(() => {
    storage.remove(latestKey.current)
    setState(latestInitialState.current)
  }, [])

  return [state, set, reset]
}

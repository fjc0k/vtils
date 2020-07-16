import {
  useLocalStorage as _useLocalStorage,
  UseLocalStorageResult,
} from './useLocalStorage'
import { getStorageSync, removeStorage, setStorage } from '@tarojs/taro'
import { useCallback, useState } from 'react'
import { useLatest, useUpdateEffect } from 'react-use'

export const useLocalStorage: typeof _useLocalStorage = <S>(
  key: string,
  initialState?: S,
): UseLocalStorageResult<S | undefined> => {
  const getLocalStorageItem = useCallback(() => {
    try {
      const data = getStorageSync(key)
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
      setStorage({
        key: latestKey.current,
        data: JSON.stringify(nextState),
      })
    },
    [],
  )

  const reset: UseLocalStorageResult<S | undefined>[2] = useCallback(() => {
    setState(latestInitialState.current)
    removeStorage({
      key: latestKey.current,
    })
  }, [])

  return [state, set, reset]
}

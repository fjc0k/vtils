import { useLocalStorage as _useLocalStorage, useUpdateEffect } from 'react-use'
import { getStorageSync, removeStorage, setStorage } from '@tarojs/taro'
import { useCallback, useState } from 'react'

export const useLocalStorage: typeof _useLocalStorage = (
  key,
  initialValue,
  // 忽略选项
  _options,
) => {
  const [value, setValue] = useState<ReturnType<typeof _useLocalStorage>[0]>(
    () => getStorageSync(key) || initialValue,
  )
  useUpdateEffect(() => {
    setValue(getStorageSync(key) || initialValue)
  }, [key])
  const set: ReturnType<typeof _useLocalStorage>[1] = useCallback(
    valueOrSetter => {
      if (typeof valueOrSetter === 'function') {
        valueOrSetter = valueOrSetter(value)
      }
      setStorage({
        key: key,
        data: valueOrSetter,
      })
      setValue(valueOrSetter)
    },
    [key, value],
  )
  const remove: ReturnType<typeof _useLocalStorage>[2] = useCallback(() => {
    removeStorage({ key })
    setValue(undefined)
  }, [key])
  return [value as any, set, remove]
}

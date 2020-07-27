import { Defined } from '../types'
import { useCallback, useState } from 'react'
import { useUpdateEffect } from 'react-use'

export type UseControllableValueResult<
  TProps,
  TValuePropName extends keyof TProps,
  TCallbackPropName extends keyof TProps,
  TDefaultValue extends TProps[TValuePropName]
> = [
  TDefaultValue extends undefined
    ? TProps[TValuePropName]
    : Defined<TProps[TValuePropName]>,
  Defined<TProps[TCallbackPropName]>,
]

/**
 * 受控值。
 *
 * @param props 组件的属性
 * @param defaultValuePropName 默认值的属性名
 * @param valuePropName 值的属性名
 * @param callbackPropName 值改变时的回调函数的属性名
 */
export function useControllableValue<
  TProps,
  TDefaultValuePropName extends keyof TProps,
  TValuePropName extends keyof TProps,
  TCallbackPropName extends keyof TProps,
  TDefaultValue extends TProps[TValuePropName]
>(
  props: TProps,
  defaultValuePropName: TDefaultValuePropName,
  valuePropName: TValuePropName,
  callbackPropName: TCallbackPropName,
  defaultValue?: TDefaultValue,
): UseControllableValueResult<
  TProps,
  TValuePropName,
  TCallbackPropName,
  TDefaultValue
> {
  const [value, setValue] = useState(() => {
    if (valuePropName in props) {
      return props[valuePropName]
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName]
    }
    return defaultValue
  })

  useUpdateEffect(() => {
    if (valuePropName in props) {
      setValue(props[valuePropName])
    }
  }, [props[valuePropName]])

  const handleSetValue = useCallback(
    (nextValue: typeof value) => {
      if (!(valuePropName in props)) {
        setValue(nextValue)
      }
      if (typeof props[callbackPropName] === 'function') {
        ;(props[callbackPropName] as any)(nextValue)
      }
    },
    [props, valuePropName, callbackPropName],
  )

  return [value, handleSetValue] as any
}

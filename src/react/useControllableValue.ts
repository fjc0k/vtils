import { Defined } from '../types'
import { useCallback, useState } from 'react'
import { useUpdateEffect } from 'react-use'

export type UseControllableValueOptions<
  TProps,
  TDefaultValuePropName extends keyof TProps,
  TValuePropName extends keyof TProps,
  TCallbackPropName extends keyof TProps,
  TDefaultValue extends TProps[TValuePropName]
> = {
  /**
   * 默认值的属性名。
   */
  defaultValuePropName: TDefaultValuePropName

  /**
   * 值的属性名。
   */
  valuePropName: TValuePropName

  /**
   * 值改变时的回调函数的属性名。
   */
  callbackPropName: TCallbackPropName

  /**
   * 默认值。
   */
  defaultValue?: TDefaultValue

  /**
   * 是否总是更新值。
   */
  alwaysUpdateValue?: boolean
}

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
 * @param options 选项
 */
export function useControllableValue<
  TProps,
  TDefaultValuePropName extends keyof TProps,
  TValuePropName extends keyof TProps,
  TCallbackPropName extends keyof TProps,
  TDefaultValue extends TProps[TValuePropName]
>(
  props: TProps,
  options: UseControllableValueOptions<
    TProps,
    TDefaultValuePropName,
    TValuePropName,
    TCallbackPropName,
    TDefaultValue
  >,
): UseControllableValueResult<
  TProps,
  TValuePropName,
  TCallbackPropName,
  TDefaultValue
> {
  const [value, setValue] = useState(() => {
    if (options.valuePropName in props) {
      return props[options.valuePropName]
    }
    if (options.defaultValuePropName in props) {
      return props[options.defaultValuePropName]
    }
    return options.defaultValue
  })

  useUpdateEffect(() => {
    if (options.valuePropName in props) {
      setValue(props[options.valuePropName])
    }
  }, [props[options.valuePropName]])

  const handleSetValue = useCallback(
    (nextValue: typeof value) => {
      if (!(options.valuePropName in props) || options.alwaysUpdateValue) {
        setValue(nextValue)
      }
      if (typeof props[options.callbackPropName] === 'function') {
        ;(props[options.callbackPropName] as any)(nextValue)
      }
    },
    [props, options.valuePropName, options.callbackPropName],
  )

  return [value, handleSetValue] as any
}

import { useCallback, useState } from 'react'
import { useLatest, useUpdateEffect } from 'react-use'
import { Defined } from '../types/index.ts'

export type UseControllableValueOptions<
  TProps,
  TDefaultValuePropName extends keyof TProps,
  TValuePropName extends keyof TProps,
  TCallbackPropName extends keyof TProps,
  TDefaultValue extends TProps[TValuePropName],
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
  TDefaultValue extends TProps[TValuePropName],
> = [
  TDefaultValue extends undefined
    ? TProps[TValuePropName]
    : Defined<TProps[TValuePropName]>,
  Defined<TProps[TCallbackPropName]>,
  () => void,
]

/**
 * 受控值。
 *
 * @param props 组件的属性
 * @param options 选项
 */
export function useControllableValue<
  TProps extends {},
  TDefaultValuePropName extends keyof TProps,
  TValuePropName extends keyof TProps,
  TCallbackPropName extends keyof TProps,
  TDefaultValue extends TProps[TValuePropName],
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
  const latestProps = useLatest(props)
  const latestOptions = useLatest(options)

  const getInitialValue = useCallback(() => {
    if (latestOptions.current.valuePropName in latestProps.current) {
      return latestProps.current[latestOptions.current.valuePropName]
    }
    if (latestOptions.current.defaultValuePropName in latestProps.current) {
      return latestProps.current[latestOptions.current.defaultValuePropName]
    }
    return latestOptions.current.defaultValue
  }, [])

  const [value, setValue] = useState(getInitialValue)

  useUpdateEffect(() => {
    if (options.valuePropName in props) {
      setValue(props[options.valuePropName])
    }
  }, [props[options.valuePropName]])

  const handleSetValue = useCallback((nextValue: typeof value) => {
    if (
      !(latestOptions.current.valuePropName in latestProps.current) ||
      latestOptions.current.alwaysUpdateValue
    ) {
      setValue(nextValue)
    }
    if (
      typeof latestProps.current[latestOptions.current.callbackPropName] ===
      'function'
    ) {
      ;(latestProps.current[latestOptions.current.callbackPropName] as any)(
        nextValue,
      )
    }
  }, [])

  const handleResetValue = useCallback(() => {
    handleSetValue(getInitialValue())
  }, [])

  return [value, handleSetValue, handleResetValue] as any
}

import React from 'react'
import { OptionalKeys } from '../types'

/**
 * 定义组件的选项。
 */
export type DefineComponentOptions<
  /**
   * 组件属性。
   */
  TProps extends Record<string, any>,
  /**
   * 是否转发 ref。
   */
  TForwardRef extends boolean,
  /**
   * 要转发的 ref。
   */
  TRef extends any = never
> = {
  /**
   * 可选属性的默认值。
   */
  defaultProps?: {
    [K in OptionalKeys<TProps>]?: TProps[K]
  }

  /**
   * 组件展示名称。
   */
  displayName?: string

  /**
   * 组件。
   */
  component: TForwardRef extends true
    ? React.ForwardRefRenderFunction<TRef, Omit<TProps, 'key' | 'ref'>>
    : React.FC<Omit<TProps, 'key' | 'ref'>>
} & (TForwardRef extends true
  ? {
      /**
       * 是否转发 ref。
       */
      forwardRef?: true
    }
  : {
      /**
       * 是否转发 ref。
       */
      forwardRef: false
    })

/**
 * 定义组件。
 *
 * @param options 选项
 */
export function defineComponent<
  TProps extends Record<string, any>,
  TRef extends any = any
>(
  options: DefineComponentOptions<TProps, true, TRef>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TProps> & React.RefAttributes<TRef>
>

/**
 * 定义组件。
 *
 * @param options 选项
 */
export function defineComponent<
  TProps extends Record<string, any>,
  TRef extends any = any
>(options: DefineComponentOptions<TProps, false>): React.FC<TProps>

export function defineComponent(
  options: DefineComponentOptions<any, any, any>,
): any {
  const forwardRef = options.forwardRef ?? true
  const displayName = options.displayName ?? options.component.name
  const component = forwardRef
    ? React.forwardRef(options.component as any)
    : options.component
  component.displayName = displayName
  component.defaultProps = options.defaultProps
  return component
}

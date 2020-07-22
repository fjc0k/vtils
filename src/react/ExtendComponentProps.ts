import React from 'react'
import { Merge } from '../types'

/**
 * 继承组件属性。
 *
 * @template TComponent 组件
 * @template TExclude 需去除的属性
 * @template TRef 新的 ref
 * @template TOverride 覆盖属性
 */
export type ExtendComponentProps<
  TComponent extends
    | React.ComponentType
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
  TExclude extends keyof React.ComponentProps<TComponent>,
  TRef extends any = never,
  TOverride extends Partial<
    Record<keyof React.ComponentProps<TComponent>, any>
  > = never
> = Merge<
  Merge<
    Omit<React.ComponentProps<TComponent>, TExclude>,
    [TOverride] extends [never] ? {} : TOverride
  >,
  [TRef] extends [never] ? {} : React.RefAttributes<TRef>
>

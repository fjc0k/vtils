import React from 'react'
import {assign, isFunction, Merge, PartialBy} from 'vtils'

export type PropsWithStyledHTMLAttributes<P = {}> = Merge<Pick<React.HTMLAttributes<any>, 'style' | 'className'>, P>

export type RequiredProp<T = any> = { ____TYPE____: T }

type MakeInternalProps<TDefaultProps> = {
  [K in keyof TDefaultProps]: TDefaultProps[K] extends RequiredProp<infer T> ? T : TDefaultProps[K]
}

/* eslint-disable */
type MakeExternalProps<TDefaultProps> = PartialBy<
  MakeInternalProps<TDefaultProps>,
  {[K in keyof TDefaultProps]: TDefaultProps[K] extends RequiredProp ? never : K}[keyof TDefaultProps]
>
/* eslint-enable */

export type BuildFunctionComponentCreatorOptions<TExtraProps = {}, TTransformedComponent = React.FunctionComponent> = {
  extraProps?: TExtraProps,
  transformComponent?: (Component: React.FunctionComponent) => TTransformedComponent,
}

export type FunctionComponentCreator<TExtraProps, TTransformedComponent> = {
  <
    TProps extends PropsWithStyledHTMLAttributes<TExtraProps>,
    TInternalComponent extends React.FunctionComponent<TProps>
  >(Component: TInternalComponent): Merge<TTransformedComponent, React.FunctionComponent<TProps>>,
  <
    TDefaultProps extends Record<string, any>,
    TInternalProps extends MakeInternalProps<Merge<TDefaultProps, TExtraProps>>,
    TExternalProps extends MakeExternalProps<Merge<TDefaultProps, TExtraProps>>,
    TInternalComponent extends React.FunctionComponent<PropsWithStyledHTMLAttributes<TInternalProps>>
  >(defaultProps: TDefaultProps, Component: TInternalComponent): Merge<TTransformedComponent, React.FunctionComponent<PropsWithStyledHTMLAttributes<TExternalProps>>>,
}

/**
 * 构造一个函数组件创建器。
 *
 * @param options 构造参数
 * @returns 返回函数组件创建器
 */
export function buildFunctionComponentCreator<
  TExtraProps extends Record<string, any> = {},
  TTransformedComponent extends React.FunctionComponent = React.FunctionComponent
>(options: BuildFunctionComponentCreatorOptions<TExtraProps, TTransformedComponent> = {}): FunctionComponentCreator<TExtraProps, TTransformedComponent> {
  const creator: FunctionComponentCreator<TExtraProps, TTransformedComponent> = (
    defaultProps: Record<string, any> | React.FunctionComponent,
    component?: React.FunctionComponent,
  ) => {
    if (isFunction(defaultProps)) {
      component = defaultProps
      defaultProps = {}
    }
    component!.defaultProps = assign({}, defaultProps, options.extraProps || {})
    if (options.transformComponent) {
      component = options.transformComponent(component!)
    }
    return component as any
  }
  return creator
}

export const createFunctionComponent = buildFunctionComponentCreator()

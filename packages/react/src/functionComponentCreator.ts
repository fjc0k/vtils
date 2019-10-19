import React, {PropsWithChildren} from 'react'
import {assign, isFunction, Merge, PartialBy} from 'vtils'

export type PropsWithStyledHTMLAttributes<P = {}> = Merge<Pick<React.HTMLAttributes<any>, 'style' | 'className'>, P>

export type RequiredProp<T = any> = { ____TYPE____: T }

type MakeInternalProps<TDefaultProps> = PropsWithChildren<PropsWithStyledHTMLAttributes<{
  [K in keyof TDefaultProps]: TDefaultProps[K] extends RequiredProp<infer T> ? T : TDefaultProps[K]
}>>

/* eslint-disable */
type MakeExternalProps<TDefaultProps> = PropsWithChildren<PropsWithStyledHTMLAttributes<PartialBy<
  MakeInternalProps<TDefaultProps>,
  {[K in keyof TDefaultProps]: TDefaultProps[K] extends RequiredProp ? never : K}[keyof TDefaultProps]
>>>
/* eslint-enable */

type MakePropsReturn<TDefaultProps = {}> = {
  InternalProps: MakeInternalProps<TDefaultProps>,
  ExternalProps: MakeExternalProps<TDefaultProps>,
}

export function makeProps<TDefaultProps extends Record<string, any>>(defaultProps: TDefaultProps): MakePropsReturn<TDefaultProps> {
  return defaultProps as any
}

export type BuildFunctionComponentCreatorOptions<TExtraProps extends MakePropsReturn, TTransformedComponent extends React.FunctionComponent> = {
  extraProps?: TExtraProps,
  transformComponent?: (Component: React.FunctionComponent) => TTransformedComponent,
}

export type FunctionComponentCreator<TExtraProps extends MakePropsReturn, TTransformedComponent> = {
  <
    TInternalProps extends TExtraProps['InternalProps'],
    TExternalProps extends TExtraProps['ExternalProps'],
    TInternalComponent extends React.FunctionComponent<TInternalProps>
  >(Component: TInternalComponent): Merge<TTransformedComponent, React.FunctionComponent<TExternalProps>> & { IProps: TExternalProps },
  <
    TProps extends MakePropsReturn,
    TInternalProps extends Merge<TProps['InternalProps'], TExtraProps['InternalProps']>,
    TExternalProps extends Merge<TProps['ExternalProps'], TExtraProps['ExternalProps']>,
    TInternalComponent extends React.FunctionComponent<TInternalProps>
  >(props: TProps, Component: TInternalComponent): Merge<TTransformedComponent, React.FunctionComponent<TExternalProps>> & { IProps: TExternalProps },
}

/**
 * 构造一个函数组件创建器。
 *
 * @param options 构造参数
 * @returns 返回函数组件创建器
 */
export function buildFunctionComponentCreator<
  TExtraProps extends MakePropsReturn = MakePropsReturn,
  TTransformedComponent extends React.FunctionComponent = React.FunctionComponent
>(options: BuildFunctionComponentCreatorOptions<TExtraProps, TTransformedComponent> = {}): FunctionComponentCreator<TExtraProps, TTransformedComponent> {
  const creator: FunctionComponentCreator<TExtraProps, TTransformedComponent> = (
    props: MakePropsReturn | React.FunctionComponent,
    component?: React.FunctionComponent,
  ) => {
    if (isFunction(props)) {
      component = props
      props = {} as any
    }
    component!.defaultProps = assign({}, props, options.extraProps || {})
    if (options.transformComponent) {
      component = options.transformComponent(component!)
    }
    return component as any
  }
  return creator
}

export const createFunctionComponent = buildFunctionComponentCreator()

import React from 'react'
import ReactDOM from 'react-dom'
import { PickBy } from 'vtils/types'

export interface RenderComponentResult<
  TComponent extends React.ComponentType<any>
> {
  /**
   * 增量重渲染，新属性将与增量属性合并并成为新的增量属性。
   *
   * @param props 新属性
   */
  incrementalRerender(props: Partial<React.ComponentProps<TComponent>>): void

  /**
   * 部分重渲染，新属性将与初始属性合并。
   *
   * @param props 新属性
   */
  partialRerender(props: Partial<React.ComponentProps<TComponent>>): void

  /**
   * 完全重渲染，新属性将直接作为全部属性传给组件。
   *
   * @param props 新属性
   */
  fullRerender(props: React.ComponentProps<TComponent>): void

  /**
   * 销毁组件并移除 DOM 节点。
   */
  destroy(): void
}

/**
 * 独立渲染一个组件在 document.body 下，常应用于弹窗类组件。
 *
 * @param Component 要渲染的组件
 * @param initialProps 初始属性
 * @param injectCallbacks 回调函数注入
 */
export function renderComponent<TComponent extends React.ComponentType<any>>(
  Component: TComponent,
  initialProps: React.ComponentProps<TComponent>,
  injectCallbacks?: PickBy<
    React.ComponentProps<TComponent>,
    Function | undefined
  >,
): RenderComponentResult<TComponent> {
  let container: HTMLDivElement | null = document.createElement('div')
  document.body.appendChild(container)

  const render = (props: Partial<React.ComponentProps<TComponent>>) => {
    props = { ...props }
    if (injectCallbacks) {
      for (const key of Object.keys(injectCallbacks)) {
        const originalCallback = props[key]
        ;(props as any)[key] = async () => {
          await originalCallback?.()
          await (injectCallbacks as any)[key]()
        }
      }
    }
    ReactDOM.render(React.createElement(Component, props), container)
  }

  render(initialProps)

  let incrementalProps: React.ComponentProps<TComponent> = { ...initialProps }

  return {
    incrementalRerender(props: Partial<React.ComponentProps<TComponent>>) {
      if (!container) return
      incrementalProps = {
        ...incrementalProps,
        ...props,
      }
      render(incrementalProps)
    },
    partialRerender(props: Partial<React.ComponentProps<TComponent>>) {
      if (!container) return
      render({
        ...initialProps,
        ...props,
      })
    },
    fullRerender(props: React.ComponentProps<TComponent>) {
      if (!container) return
      render(props)
    },
    destroy() {
      if (!container) return
      const unmountResult = ReactDOM.unmountComponentAtNode(container)
      if (unmountResult) {
        container.parentNode?.removeChild(container)
      }
      container = null
    },
  }
}

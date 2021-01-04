import React from 'react'
import ReactDOM from 'react-dom'
import { isPromiseLike } from '../utils'
import { PickBy } from 'vtils/types'
import { useUpdate } from 'react-use'

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
  let hasContainer = true
  let render!: (props: Partial<React.ComponentProps<TComponent>>) => void
  let destroy!: () => void

  const prepareProps = (props: Partial<React.ComponentProps<TComponent>>) => {
    props = { ...props }
    if (injectCallbacks) {
      for (const key of Object.keys(injectCallbacks)) {
        const originalCallback = props[key]
        ;(props as any)[key] = () => {
          const res = originalCallback?.()
          if (isPromiseLike(res)) {
            return res.then(() => (injectCallbacks as any)[key]())
          }
          return (injectCallbacks as any)[key]()
        }
      }
    }
    return props
  }

  if (hasRenderComponentContainer) {
    let childIndex: number | undefined
    render = props => {
      props = prepareProps(props)
      if (childIndex == null) {
        childIndex = renderComponentContainerChildren.length
        renderComponentContainerChildren.push(
          React.createElement(Component, props),
        )
      } else {
        renderComponentContainerChildren.splice(
          childIndex,
          1,
          React.createElement(Component, props),
        )
      }
      updateRenderComponentContainer!()
    }
    destroy = () => {
      if (childIndex != null) {
        renderComponentContainerChildren.splice(childIndex, 1)
        updateRenderComponentContainer!()
      }
    }
  } else {
    let container: HTMLDivElement | null = document.createElement('div')
    document.body.appendChild(container)
    render = props => {
      props = prepareProps(props)
      ReactDOM.render(React.createElement(Component, props), container)
    }
    destroy = () => {
      if (!hasContainer || !container) return
      const unmountResult = ReactDOM.unmountComponentAtNode(container)
      if (unmountResult) {
        container.parentNode?.removeChild(container)
      }
      container = null
      hasContainer = false
    }
  }

  let incrementalProps: React.ComponentProps<TComponent> = {
    key: Date.now(),
    ...initialProps,
  }

  render(incrementalProps)

  return {
    incrementalRerender(props: Partial<React.ComponentProps<TComponent>>) {
      if (!hasContainer) return
      incrementalProps = {
        ...incrementalProps,
        ...props,
      }
      render(incrementalProps)
    },
    partialRerender(props: Partial<React.ComponentProps<TComponent>>) {
      if (!hasContainer) return
      render({
        ...initialProps,
        ...props,
      })
    },
    fullRerender(props: React.ComponentProps<TComponent>) {
      if (!hasContainer) return
      render(props)
    },
    destroy: destroy,
  }
}

// 渲染容器
let hasRenderComponentContainer = false
let updateRenderComponentContainer: ReturnType<typeof useUpdate> | undefined
const renderComponentContainerChildren: any[] = []

export function RenderComponentContainer() {
  hasRenderComponentContainer = true
  updateRenderComponentContainer = useUpdate()
  return React.createElement(React.Fragment, {
    children: renderComponentContainerChildren,
  })
}

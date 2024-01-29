/* eslint-disable prefer-rest-params, prefer-spread */
import { AnyFunction } from '../types/index.ts'

/**
 * 绑定事件函数。
 *
 * @public
 * @param type 事件类型
 * @param callback 事件回调
 * @param options 事件选项
 * @returns 返回事件解绑函数
 */
export type BindEventFunction<T> = <
  // prettier-ignore
  E extends
    // window
    T extends typeof window
    ? WindowEventMap

    // 打包时报错: Cannot find name 'HTMLVideoElementEventMap'
    // video
    // : T extends HTMLVideoElement
    // ? HTMLVideoElementEventMap

    // media
    : T extends HTMLMediaElement
    ? HTMLMediaElementEventMap

    // body
    : T extends HTMLBodyElement
    ? HTMLBodyElementEventMap

    // frame set
    : T extends HTMLFrameSetElement
    ? HTMLFrameSetElementEventMap

    // FileReader
    : T extends FileReader
    ? FileReaderEventMap

    // WebSocket
    : T extends WebSocket
    ? WebSocketEventMap

    // svg element
    : T extends SVGElement
    ? SVGElementEventMap

    // html element
    : T extends HTMLElement
    ? HTMLElementEventMap

    // others
    : Record<string, any>,
  K extends keyof E,
>(
  type: K,
  callback: (this: T, ev: E[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => () => any

/**
 * 绑定事件。
 *
 * @public
 * @param target 事件绑定的目标
 * @returns 返回事件绑定函数
 * @example
 * ```typescript
 * const bindWindowEvent = bindEvent(window)
 * const unbindClick = bindWindowEvent('click', console.log)
 * const unbindScroll = bindWindowEvent('scroll', console.log)
 * ```
 */
export function bindEvent<
  T extends Record<'addEventListener' | 'removeEventListener', AnyFunction>,
>(target: T): BindEventFunction<T> {
  return (type, callback, options) => {
    target.addEventListener(type, callback, options)
    return () => target.removeEventListener(type, callback, options)
  }
}

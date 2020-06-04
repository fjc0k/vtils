/* eslint-disable prefer-rest-params, prefer-spread */
import { AnyFunction } from '../types'

/**
 * @public
 */
export type BindEventResult<T> = <
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
  K extends keyof E
>(
  type: K,
  callback: (this: T, ev: E[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => () => any

/**
 * @public
 */
export function bindEvent<
  T extends Record<'addEventListener' | 'removeEventListener', AnyFunction>
>(target: T): BindEventResult<T> {
  return (type, callback, options) => {
    target.addEventListener(type, callback, options)
    return () => target.removeEventListener(type, callback, options)
  }
}

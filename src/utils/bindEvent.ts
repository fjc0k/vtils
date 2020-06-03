/* eslint-disable prefer-rest-params, prefer-spread */
import { AnyFunction } from '../types'

export type BindEventResult<T> = <
  E extends T extends typeof window // window
    ? WindowEventMap
    : T extends HTMLVideoElement // video
    ? HTMLVideoElementEventMap
    : T extends HTMLMediaElement // media
    ? HTMLMediaElementEventMap
    : T extends HTMLBodyElement // body
    ? HTMLBodyElementEventMap
    : T extends HTMLFrameSetElement // frame set
    ? HTMLFrameSetElementEventMap
    : T extends FileReader // FileReader
    ? FileReaderEventMap
    : T extends WebSocket // WebSocket
    ? WebSocketEventMap
    : T extends SVGElement // svg element
    ? SVGElementEventMap
    : T extends HTMLElement // html element
    ? HTMLElementEventMap
    : Record<string, any>, // others
  K extends keyof E
>(
  type: K,
  callback: (this: T, ev: E[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => () => any

export function bindEvent<
  T extends Record<'addEventListener' | 'removeEventListener', AnyFunction>
>(target: T): BindEventResult<T> {
  return (type, callback, options) => {
    target.addEventListener(type, callback, options)
    return () => target.removeEventListener(type, callback, options)
  }
}

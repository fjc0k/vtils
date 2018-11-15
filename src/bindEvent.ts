export type BindEventTypes = string | string[]
export type BindEventListener = EventListenerOrEventListenerObject
export type BindEventListenerOptions = boolean | AddEventListenerOptions
export type UnbindEventListener = () => void

/**
 * 将指定类型的事件绑定在指定的目标上并返回解绑函数。
 *
 * @param target 事件目标
 * @param types 事件类型
 * @param listener 事件监听器
 * @param [options] 事件选项
 */
export default function bindEvent(
  target: EventTarget,
  types: BindEventTypes,
  listener: EventListenerOrEventListenerObject,
  options?: BindEventListenerOptions
): UnbindEventListener {
  const disposes: Array<() => void> = []
  ;(Array.isArray(types) ? types : types.split(/\s+/)).forEach(eventType => {
    target.addEventListener(eventType, listener, options)
    disposes.push(() => target.removeEventListener(eventType, listener, options))
  })
  return () => disposes.forEach(dispose => dispose())
}

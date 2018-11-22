/**
 * 阻止事件的进一步传播。
 *
 * @param e 要阻止的事件
 */
export default function stopEventPropagation(e: { stopPropagation: (...args: any[]) => any }): void {
  /* istanbul ignore else */
  e.stopPropagation()
}

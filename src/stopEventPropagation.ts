/**
 * 阻止事件的进一步传播。
 *
 * @param e 要阻止的事件
 */
export default function stopEventPropagation (e: Event): void {
  /* istanbul ignore else */
  if (e instanceof Event) {
    e.stopPropagation()
  }
}

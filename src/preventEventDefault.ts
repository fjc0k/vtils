/**
 * 阻止事件的默认行为。
 *
 * @param e 要阻止的事件
 */
export function preventEventDefault(e: { preventDefault: (...args: any[]) => any }): void {
  /* istanbul ignore else */
  e.preventDefault()
}

/**
 * 阻止事件的默认行为。
 *
 * @param e 要阻止的事件
 */
export default function preventEventDefault(e: Event): void {
  /* istanbul ignore else */
  if (e instanceof Event) {
    e.preventDefault()
  }
}

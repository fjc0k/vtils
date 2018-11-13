/**
 * 停止 CSS 变换。
 *
 * @param el 要停止变换的元素
 */
export default function stopCssTransform(el: HTMLElement): void {
  el.style.transition
    = (el.style as any).msTransition
    = (el.style as any).oTransition
    = (el.style as any).mozTransition
    = (el.style as any).webkitTransition
    = 'none'
}

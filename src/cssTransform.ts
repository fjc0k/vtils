/**
 * CSS 变换。
 *
 * @param el 要变换的元素
 * @param transformRule 变换规则
 * @param transitionRule 过渡规则
 */
export default function cssTransform(el: HTMLElement, transformRule: string, transitionRule: string): void {
  el.style.transform
    = (el.style as any).msTransform
    = (el.style as any).OTransform
    = (el.style as any).MozTransform
    = (el.style as any).webkitTransform
    = transformRule;
  (el.style as any).webkitTransition = `-webkit-transform ${transitionRule}`;
  (el.style as any).mozTransition = `-moz-transform ${transitionRule}`;
  (el.style as any).oTransition = `-o-transform ${transitionRule}`;
  (el.style as any).msTransition = `-ms-transform ${transitionRule}`
  el.style.transition = `transform ${transitionRule}`
}

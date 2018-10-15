interface CssTransform {
  (el: HTMLElement, transformRule: string, transitionRule: string): void,
  /**
   * 停止 CSS 变换。
   *
   * @param el 要停止变换的元素
   */
  stop(el: HTMLElement): void
}

/**
 * CSS 变换。
 *
 * @param el 要变换的元素
 * @param transformRule 变换规则
 * @param transitionRule 过渡规则
 */
const cssTransform: CssTransform = (el: HTMLElement, transformRule: string, transitionRule: string): void => {
  el.style.webkitTransform = transformRule
  el.style.transform = transformRule
  el.style.webkitTransition = `-webkit-transform ${transitionRule}`
  el.style.transition = `transform ${transitionRule}`
}

cssTransform.stop = (el: HTMLElement): void => {
  el.style.webkitTransition = 'none'
  el.style.transition = 'none'
}

export default cssTransform

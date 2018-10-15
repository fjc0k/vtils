interface CssTransform {
    (el: HTMLElement, transformRule: string, transitionRule: string): void;
    /**
     * 停止 CSS 变换。
     *
     * @param el 要停止变换的元素
     */
    stop(el: HTMLElement): void;
}
/**
 * CSS 变换。
 *
 * @param el 要变换的元素
 * @param transformRule 变换规则
 * @param transitionRule 过渡规则
 */
declare const cssTransform: CssTransform;
export default cssTransform;

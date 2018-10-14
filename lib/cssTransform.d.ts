/**
 * CSS 变换。
 *
 * @param el 要变换的元素
 * @param transformRule 变换规则
 * @param transitionRule 过渡规则
 */
declare function cssTransform(el: HTMLElement, transformRule: string, transitionRule: string): void;
declare namespace cssTransform {
    var stop: typeof stop;
}
/**
 * 停止 CSS 变换。
 *
 * @param el 要停止变换的元素
 */
declare function stop(el: HTMLElement): void;
export default cssTransform;

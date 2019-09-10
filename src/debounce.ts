import {AnyFunction} from './enhanceType'

/**
 * 创建一个去抖函数，将触发频繁的事件合并成一次执行。
 *
 * 该函数被调用后，计时 `wait` 毫秒后调用 `fn` 函数。
 * 若在 `wait` 毫秒内该函数再次被调用，则重新开始计时。
 *
 * 一个应用场景：监听输入框的 `input` 事件发起网络请求。
 *
 * @param fn 要去抖的函数
 * @param wait 需要等待的毫秒数
 * @returns 返回去抖后的函数
 * @example
 * ```ts
 * document.querySelector('#input').oninput = debounce(
 *   e => {
 *     console.log(e.target.value)
 *   },
 *   500,
 * )
 * ```
 */
export function debounce<T extends AnyFunction>(fn: T, wait: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null

  return function (this: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(
      () => fn.apply(this, arguments as any),
      wait,
    )
  }
}

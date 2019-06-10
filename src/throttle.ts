import { AnyFunction } from './enhanceType'

/**
 * 创建一个节流函数，给函数设置固定的执行速率。
 *
 * - 该函数首次被调用时，会立即调用 `fn` 函数，并记录首次调用时间。
 *   - 该函数第二次被调用时：
 *     - 如果该次调用时间在首次调用时间的 `wait` 区间内，`timer = setTimeout(操作, 时间差)`；
 *       - 该函数再次被调用时：
 *         - 如果该次调用时间在首次调用时间的 `wait` 区间内，什么都不做；
 *         - 否则，清除首次调用时间和计时器，回到第一步。
 *     - 否则，清除首次调用时间，回到第一步。
 *
 * 一个应用场景：监听窗口的 `resize` 事件响应相关操作。
 *
 * @param fn 要节流的函数
 * @param wait 需要等待的毫秒数
 * @returns 返回节流后的函数
 * @example
 * ```ts
 * window.addEventListener(
 *   'resize',
 *   throttle(
 *     () => console.log('窗口大小改变后的操作'),
 *     1000,
 *   ),
 * )
 * ```
 */
export function throttle<T extends AnyFunction>(fn: T, wait: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  let lastTime: number | null = null

  return function (this: any) {
    const currentTime = new Date().getTime()

    const action = () => {
      lastTime = currentTime
      fn.apply(this, arguments as any)
    }

    // 首次调用
    if (!lastTime) {
      action()
    }

    // 第二次调用
    else if (!timer) {
      if (currentTime < lastTime + wait) {
        timer = setTimeout(
          () => {
            fn.apply(this, arguments as any)
          },
          lastTime + wait - currentTime,
        )
      } else {
        action()
      }
    }

    // 再次调用
    else {
      if (currentTime > lastTime + wait) {
        timer = null
        action()
      }
    }
  }
}

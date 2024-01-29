import { sample } from 'lodash-uni'
import { AsyncOrSync, OneOrMore } from '../types/index.ts'
import { wait } from './wait.ts'

export interface LoopUntilOptions {
  /**
   * 重试延时，为数组时随机挑选一个。
   */
  retryDelay: OneOrMore<number>

  /**
   * 重试限制。
   */
  retryLimit?: number
}

export class LoopUntilRetryLimitExceededError extends Error {}

export async function loopUntil<T>(
  fn: () => AsyncOrSync<T>,
  condition: (res: T) => AsyncOrSync<boolean>,
  options: LoopUntilOptions,
): Promise<T>

export async function loopUntil(
  condition: () => AsyncOrSync<boolean>,
  options: LoopUntilOptions,
): Promise<void>

/**
 * 循环调用某个函数直至达到某个条件后返回调用结果。
 *
 * @param fn 要调用的函数
 * @param condition 条件
 * @param options 选项
 */
export async function loopUntil<T>(
  fn: any,
  condition: any,
  options?: any,
): Promise<T> {
  if (options == null) {
    options = condition
    condition = fn
    fn = undefined
  }

  let retryCount = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = fn ? await fn() : undefined
    if (await condition(res)) {
      return res
    }
    if (options.retryLimit && retryCount >= options.retryLimit) {
      throw new LoopUntilRetryLimitExceededError('已达到最大重试次数')
    }
    retryCount++
    await wait(
      typeof options.retryDelay === 'number'
        ? options.retryDelay
        : sample(options.retryDelay)!,
    )
  }
}

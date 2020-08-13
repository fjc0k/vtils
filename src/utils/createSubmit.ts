import { AsyncOrSync } from '../types'
import { run } from './run'
import { wait } from './wait'

export interface CreateSubmitOptions {
  /**
   * 开始回调。
   *
   * @param message 提示信息
   */
  start(message: string): AsyncOrSync<any>

  /**
   * 失败回调。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒）
   */
  fail(message: string, duration: number): AsyncOrSync<any>

  /**
   * 成功回调。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒）
   */
  success(message: string, duration: number): AsyncOrSync<any>

  /**
   * 完成回调。
   */
  complete(): AsyncOrSync<any>
}

export interface SubmitActionPayload {
  /**
   * 开始提示。
   *
   * @param message 提示信息
   */
  start(message: string): Promise<any>

  /**
   * 失败提示。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒），默认 1500
   */
  fail(message: string, duration?: number): Promise<any>

  /**
   * 成功提示。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒），默认 1500
   */
  success(message: string, duration?: number): Promise<any>
}

export type CreateSubmitResult = <TResult>(
  action: (payload: SubmitActionPayload) => Promise<TResult>,
) => Promise<TResult>

/**
 * 创建提交类行为。
 *
 * @param options 选项
 */
export function createSubmit(options: CreateSubmitOptions): CreateSubmitResult {
  const payload: SubmitActionPayload = {
    start(message) {
      return run(() => options.start(message))
    },
    fail(message, duration = 1500) {
      return run(() => options.fail(message, duration)).then(() =>
        wait(duration),
      )
    },
    success(message, duration = 1500) {
      return run(() => options.success(message, duration)).then(() =>
        wait(duration),
      )
    },
  }
  return action => {
    return action(payload).then(res => {
      return run(() => options.complete()).then(() => res)
    })
  }
}

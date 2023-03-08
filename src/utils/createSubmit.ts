import { AsyncOrSync } from '../types'
import { run } from './run'
import { wait } from './wait'

export interface CreateSubmitOptions<T> {
  /**
   * 开始回调。
   *
   * @param message 提示信息
   */
  start(message?: T): AsyncOrSync<any>

  /**
   * 失败回调。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒）
   */
  fail(message: T, duration: number): AsyncOrSync<any>

  /**
   * 成功回调。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒）
   */
  success(message: T, duration: number): AsyncOrSync<any>

  /**
   * 完成回调。
   */
  complete(): AsyncOrSync<any>

  /**
   * 异常回调。
   */
  throw?(error: unknown): AsyncOrSync<any>
}

export interface SubmitActionPayload<T> {
  /**
   * 开始提示。
   *
   * @param message 提示信息
   */
  start(message?: T): Promise<any>

  /**
   * 失败提示。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒），默认 1500
   */
  fail(message: T, duration?: number): Promise<any>

  /**
   * 成功提示。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒），默认 1500
   */
  success(message: T, duration?: number): Promise<any>
}

export type CreateSubmitResult<T> = <TResult>(
  action: (payload: SubmitActionPayload<T>) => Promise<TResult>,
) => Promise<TResult>

/**
 * 创建提交类行为。
 *
 * @param options 选项
 */
export function createSubmit(
  options: CreateSubmitOptions<string>,
): CreateSubmitResult<string>
/**
 * 创建提交类行为。
 *
 * @param options 选项
 */
export function createSubmit<T>(
  options: CreateSubmitOptions<T>,
): CreateSubmitResult<T>
/**
 * 创建提交类行为。
 *
 * @param options 选项
 */
export function createSubmit<T>(
  options: CreateSubmitOptions<T>,
): CreateSubmitResult<T> {
  const payload: SubmitActionPayload<T> = {
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
    return action(payload)
      .then(res => {
        return run(() => options.complete()).then(() => res)
      })
      .catch((error: unknown) => {
        if (options.throw) {
          options.throw(error)
        }
        return Promise.reject(error)
      })
  }
}

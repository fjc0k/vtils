import { AsyncOrSync } from '../types'
import { run } from './run'
import { wait } from './wait'

export interface CreateSubmitOptions<T = string> {
  /**
   * 开始回调。
   *
   * @param message 提示信息
   */
  start(message: T | undefined, id: number): AsyncOrSync<any>

  /**
   * 失败回调。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒）
   */
  fail(message: T, duration: number, id: number): AsyncOrSync<any>

  /**
   * 成功回调。
   *
   * @param message 提示信息
   * @param duration 持续时间（毫秒）
   */
  success(message: T, duration: number, id: number): AsyncOrSync<any>

  /**
   * 完成回调。
   */
  complete(id: number): AsyncOrSync<any>

  /**
   * 异常回调。
   */
  throw?(error: unknown, id: number): AsyncOrSync<any>
}

export interface SubmitActionPayload<T = string> {
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

export type CreateSubmitResult<T = string> = (<TResult>(
  action: (payload: SubmitActionPayload<T>) => Promise<TResult>,
) => Promise<TResult>) &
  Pick<SubmitActionPayload<T>, 'fail' | 'success'>

let idCounter = 1

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
  const getPayload = (id: number): SubmitActionPayload<T> => ({
    start(message) {
      return run(() => options.start(message, id))
    },
    fail(message, duration = 1500) {
      return run(() => options.fail(message, duration, id)).then(() =>
        wait(duration),
      )
    },
    success(message, duration = 1500) {
      return run(() => options.success(message, duration, id)).then(() =>
        wait(duration),
      )
    },
  })
  const res: CreateSubmitResult<T> = action => {
    const id = idCounter++
    return action(getPayload(id))
      .then(res => {
        return run(() => options.complete(id)).then(() => res)
      })
      .catch((error: unknown) => {
        if (options.throw) {
          options.throw(error, id)
        }
        return Promise.reject(error)
      })
  }
  const globalAction = getPayload(0)
  res.success = globalAction.success
  res.fail = globalAction.fail
  return res
}

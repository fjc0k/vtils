import { hideLoading, showLoading, showToast } from '@tarojs/taro'
import { wait } from '../utils'

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

/**
 * 对提交类行为的封装。
 *
 * @param action 行为
 * @returns 返回行为结果
 * @example
 * ```typescript
 * await submit(async _ => {
 *   await _.start('保存中...')
 *   await save(data)
 *   await _.success('保存成功')
 * })
 * ```
 */
export function submit<TResult>(
  action: (payload: SubmitActionPayload) => Promise<TResult>,
): Promise<TResult> {
  const payload: SubmitActionPayload = {
    start(message) {
      showLoading({
        title: message,
        mask: true,
      })
      return Promise.resolve()
    },
    fail(message, duration = 1500) {
      hideLoading()
      showToast({
        title: message,
        icon: 'none',
        duration: duration,
      })
      return wait(duration)
    },
    success(message, duration = 1500) {
      hideLoading()
      showToast({
        title: message,
        icon: 'success',
        duration: duration,
      })
      return wait(duration)
    },
  }
  return action(payload).then(res => {
    hideLoading()
    return res
  })
}

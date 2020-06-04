/**
 * 事件巴士，管理事件的发布与订阅。
 *
 * ```
 * const bus = new EventBus<{
 *   success: (payload: { message: string }) => any
 * }>()
 * bus.on('success', ({ message }) => console.log(message))
 * bus.emit('success', { message: '提交成功' })
 * // => 控制台输出: 提交成功
 * ```
 *
 * @public
 * @template TEvents 事件名称及其对应的回调描述
 */
export class EventBus<TEvents extends Record<string, (...args: any[]) => any>> {
  /**
   * 回调列表。
   */
  private callbacks: {
    [Key in keyof TEvents]: Array<TEvents[Key]>
  } = Object.create(null)

  /**
   * 订阅事件。
   *
   * @param eventName 事件名称
   * @param callback 事件触发回调
   * @returns 返回取消订阅的函数
   */
  on<TName extends keyof TEvents>(
    eventName: TName,
    callback: TEvents[TName],
  ): () => any {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = []
    }
    const index = this.callbacks[eventName].indexOf(callback)
    if (index === -1) {
      this.callbacks[eventName].push(callback)
    }
    return () => this.off(eventName, callback)
  }

  /**
   * 订阅事件，但只订阅一次即取消订阅。
   *
   * @param eventName 事件名称
   * @param callback 事件触发回调
   * @returns 返回取消订阅的函数
   */
  once<TName extends keyof TEvents>(
    eventName: TName,
    callback: TEvents[TName],
  ): () => any {
    const off = this.on(eventName, ((...args) => {
      off()
      callback(...args)
    }) as TEvents[TName])
    return off
  }

  /**
   * 取消订阅事件，若没有指定回调，则取消所有回调。
   *
   * @param eventName 事件名称
   * @param callback 事件触发回调
   */
  off<TName extends keyof TEvents>(
    eventName: TName,
    callback?: TEvents[TName],
  ): void {
    if (this.callbacks[eventName] && callback) {
      const index = this.callbacks[eventName].indexOf(callback)
      if (index > -1) {
        this.callbacks[eventName].splice(index, 1)
      }
    } else {
      delete this.callbacks[eventName]
    }
  }

  /**
   * 发布事件。
   *
   * @param eventName 事件名称
   * @param args 传给事件回调的参数
   * @returns 返回各事件回调的返回结果组成的数组
   */
  emit<TName extends keyof TEvents>(
    eventName: TName,
    ...args: Parameters<TEvents[TName]>
  ): Array<ReturnType<TEvents[TName]>> {
    return (this.callbacks[eventName] || []).map(callback => {
      return callback(...args)
    })
  }
}

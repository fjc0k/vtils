import { AnyFunction } from './isFunction'

/** 取消订阅 */
export type EventBusUnsubscribe = () => void

/**
 * 事件巴士，管理事件的发布与订阅。
 *
 * @template T 事件名称及其对应的监听器描述
 */
export class EventBus<
  T extends Record<string, AnyFunction> = Record<string, AnyFunction>,
  K extends keyof T = keyof T,
> {
  /**
   * 监听器列表。
   *
   * @private
   */
  private listeners: { [key in K]: Array<T[key]> } = {} as any

  /**
   * 订阅事件。
   *
   * @param eventName 事件名称
   * @param listener 监听器
   * @returns 取消订阅函数
   */
  public on<X extends K>(eventName: X, listener: T[X]): EventBusUnsubscribe {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    const listeners = this.listeners[eventName]
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener)
    }
    return () => this.off(eventName, listener)
  }

  /**
   * 订阅事件，但只订阅一次。
   *
   * @param eventName 事件名称
   * @param listener 监听器
   * @returns 取消订阅函数
   */
  public once<X extends K>(eventName: X, listener: T[X]): EventBusUnsubscribe {
    const unsubscribe = this.on(eventName, ((...args: any[]) => {
      unsubscribe()
      listener(...args)
    }) as any)
    return unsubscribe
  }

  /**
   * 取消订阅事件，若没有指定监听器，则取消所有监听器。
   *
   * @param eventName 事件名称
   * @param listener 监听器
   */
  public off<X extends K>(eventName: X, listener?: T[X]): void {
    if (listener) {
      const listeners = this.listeners[eventName]
      const index = listeners.indexOf(listener)
      /* istanbul ignore else */
      if (index > -1) {
        listeners.splice(index, 1)
      }
    } else {
      delete this.listeners[eventName]
    }
  }

  /**
   * 发布事件。
   *
   * @param eventName 事件名称
   * @param args 传给监听器的参数
   * @returns 各监听器的返回结果组成的数组
   */
  public emit<X extends K>(eventName: X, ...args: Parameters<T[X]>): Array<ReturnType<T[X]>> {
    return (this.listeners[eventName] || []).map(listener => {
      return listener(...args)
    })
  }
}

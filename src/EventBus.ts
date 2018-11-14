import { ArgumentsType } from './result'

/** 取消订阅 */
export type EventBusUnsubscribe = () => void

/**
 * 事件总线，管理事件的发布与订阅。
 *
 * @template T 事件名称及其对应的监听器描述
 */
export default class EventBus<
  T extends { [key: string]: (...args: any[]) => any } = { [key: string]: (...args: any[]) => any },
  K extends Extract<keyof T, string> = Extract<keyof T, string>
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
  public subscribe<X extends K>(eventName: X, listener: T[X]): EventBusUnsubscribe {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    const listeners = this.listeners[eventName]
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener)
    }
    return () => {
      if (listener) {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
          listener = null
        }
      }
    }
  }

  /**
   * 订阅事件，但只订阅一次。
   *
   * @param eventName 事件名称
   * @param listener 监听器
   * @returns 取消订阅函数
   */
  public subscribeOnce<X extends K>(eventName: X, listener: T[X]): EventBusUnsubscribe {
    const unsubscribe = this.subscribe(eventName, (...args: any[]) => {
      unsubscribe()
      listener(...args)
    })
    return unsubscribe
  }

  /**
   * 发布事件。
   *
   * @param eventName 事件名称
   * @param args 传给监听器的参数
   * @returns 各监听器的返回结果组成的数组
   */
  public publish<X extends K>(eventName: X, ...args: ArgumentsType<T[X]>): Array<ReturnType<T[X]>> {
    return (this.listeners[eventName] || []).map(listener => {
      return listener(...args)
    })
  }
}

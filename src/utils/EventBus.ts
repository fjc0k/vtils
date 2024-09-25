import { castArray } from 'lodash-uni'

export type EventBusListenerTag = string | number

export type EventBusListener<
  TCallback extends (...args: any[]) => any = (...args: any[]) => any,
> = TCallback & {
  __EVENT_BUS_TAG__?: EventBusListenerTag
}

export type EventBusOffListener = () => any

export type EventBusListeners = Record<string, EventBusListener>

export interface EventBusListenerDescriptor<
  TListenerName extends keyof EventBusListeners,
> {
  name: TListenerName
  context?: any
  tag?: EventBusListenerTag
  filter?: (
    callback: EventBusListener,
    index: number,
    callbacks: EventBusListener[],
  ) => boolean
}

export type EventBusBeforeOn<TListeners extends EventBusListeners> = {
  [TListenerName in keyof TListeners]?: (
    this: EventBus<TListeners>,
    callback: EventBusListener<TListeners[TListenerName]>,
  ) => TListeners[TListenerName]
}

export type EventBusBeforeEmit<TListeners extends EventBusListeners> = {
  [TListenerName in keyof TListeners]?: (
    this: EventBus<TListeners>,
    context: any,
  ) => any
}

export interface EventBusOptions<TListeners extends EventBusListeners> {
  beforeOn?: EventBusBeforeOn<TListeners>
  beforeEmit?: EventBusBeforeEmit<TListeners>
}

/**
 * 事件巴士，管理事件的发布与订阅。
 *
 * @template TListeners 事件名称及其对应的回调描述
 * @example
 * ```typescript
 * const bus = new EventBus<{
 *   success: (payload: { message: string }) => any
 * }>()
 * bus.on('success', ({ message }) => console.log(message))
 * bus.emit('success', { message: '提交成功' })
 * // => 控制台输出: 提交成功
 * ```
 */
export class EventBus<TListeners extends EventBusListeners> {
  /**
   * 构造函数。
   */
  constructor(private options?: EventBusOptions<TListeners>) {}

  /**
   * 回调列表。
   */
  private callbacks: {
    [TListenerName in keyof TListeners]: Array<TListeners[TListenerName]>
  } = Object.create(null)

  /**
   * 订阅多个事件。
   *
   * @param eventNames 事件名称
   * @param callback 事件触发回调
   * @returns 返回取消订阅的函数
   */
  on<TListenerName extends keyof TListeners>(
    eventNames: TListenerName[],
    callback: (
      firstPayload: {
        [K in TListenerName]: Parameters<TListeners[K]>[0]
      },
      payload: {
        [K in TListenerName]: Parameters<TListeners[K]>
      },
    ) => any,
  ): EventBusOffListener
  /**
   * 订阅单个事件。
   *
   * @param eventName 事件名称
   * @param callback 事件触发回调
   * @returns 返回取消订阅的函数
   */
  on<TListenerName extends keyof TListeners>(
    eventName: TListenerName,
    callback: TListeners[TListenerName],
  ): EventBusOffListener
  on<TListenerName extends keyof TListeners>(
    eventNames: TListenerName | TListenerName[],
    callback: any,
  ): EventBusOffListener {
    if (Array.isArray(eventNames)) {
      const offs: EventBusOffListener[] = []
      for (const eventName of eventNames) {
        offs.push(
          // @ts-ignore
          this.on(eventName, (...args: any[]) =>
            callback(
              { [eventName]: args[0] },
              {
                [eventName]: args,
              },
            ),
          ),
        )
      }
      return () => offs.forEach(off => off())
    }
    if (!this.callbacks[eventNames]) {
      this.callbacks[eventNames] = []
    }
    callback =
      this.options?.beforeOn?.[eventNames]?.call(this, callback) ?? callback
    const index = this.callbacks[eventNames].indexOf(callback)
    if (index === -1) {
      this.callbacks[eventNames].push(callback)
    }
    return () => this.off(eventNames, callback)
  }

  /**
   * 订阅事件，但只订阅一次即取消订阅。
   *
   * @param eventName 事件名称
   * @param callback 事件触发回调
   * @returns 返回取消订阅的函数
   */
  once<TListenerName extends keyof TListeners>(
    eventName: TListenerName,
    callback: TListeners[TListenerName],
  ): EventBusOffListener {
    const off = this.on(eventName, ((...args) => {
      off()
      callback(...args)
    }) as TListeners[TListenerName])
    return off
  }

  /**
   * 取消订阅事件，若没有指定回调，则取消所有回调。
   *
   * @param eventName 事件名称
   * @param callback 事件触发回调
   */
  off<TListenerName extends keyof TListeners>(
    eventName: TListenerName,
    callbackOrTag?: TListeners[TListenerName] | string | number,
  ): void {
    if (this.callbacks[eventName] && callbackOrTag) {
      if (typeof callbackOrTag === 'function') {
        const index = this.callbacks[eventName].indexOf(callbackOrTag)
        if (index > -1) {
          this.callbacks[eventName].splice(index, 1)
        }
      } else {
        let index = this.callbacks[eventName].length
        while (index--) {
          if (
            this.callbacks[eventName][index].__EVENT_BUS_TAG__ != null &&
            this.callbacks[eventName][index].__EVENT_BUS_TAG__ === callbackOrTag
          ) {
            this.callbacks[eventName].splice(index, 1)
          }
        }
      }
    } else {
      delete this.callbacks[eventName]
    }
  }

  /**
   * 发布事件。
   *
   * @param eventNameAndContext 事件名称和上下文
   * @param args 传给事件回调的参数
   * @returns 返回各事件回调的返回结果组成的数组
   */
  emit<TListenerName extends keyof TListeners>(
    // @ts-ignore
    eventName: TListenerName | EventBusListenerDescriptor<TListenerName>,
    ...args: Parameters<TListeners[TListenerName]>
  ): Array<ReturnType<TListeners[TListenerName]>> {
    const {
      name,
      context,
      tag,
      filter,
    }: {
      name: TListenerName
      context?: any
      tag?: string | number
      filter?: (
        callback: EventBusListener,
        index: number,
        callbacks: EventBusListener[],
      ) => boolean
    } =
      typeof eventName === 'object'
        ? eventName
        : {
            name: eventName,
          }
    let callbacks = (this.callbacks[name] || []).slice()
    if (tag != null) {
      callbacks = callbacks.filter(
        callback =>
          callback.__EVENT_BUS_TAG__ != null &&
          tag === callback.__EVENT_BUS_TAG__,
      )
    }
    if (typeof filter === 'function') {
      callbacks = callbacks.filter(filter)
    }
    this.options?.beforeEmit?.[name]?.call(this, context)
    return callbacks.map(callback => {
      return callback.call(context, ...args)
    })
  }

  /**
   * 局部执行。
   *
   * @param fn 执行函数
   * @returns 可以返回一个或多个取消订阅的函数
   */
  run(
    fn: (bus: this) => void | EventBusOffListener | EventBusOffListener[],
  ): EventBusOffListener {
    const res = fn(this)
    return () => {
      if (res) {
        castArray(res).forEach(off => off())
      }
    }
  }

  /**
   * 清空事件订阅。
   */
  clear() {
    this.callbacks = Object.create(null)
  }

  /**
   * 销毁。
   */
  destroy() {
    // @ts-ignore
    this.callbacks = null
  }
}

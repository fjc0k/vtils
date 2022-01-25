import { JsonValue } from '../types'

export interface LocalStoragePlusOptions {
  /** 存储键 */
  key: string
}

export interface LocalStoragePlusSetOptions {
  /** 存活时间(毫秒) */
  ttl?: number

  /** 标签 */
  tag?: string | number
}

export interface LocalStoragePlusGetOptions {
  /** 标签 */
  tag?: string | number
}

interface LocalStoragePlusRawData<T> {
  /** 存储值 */
  v: T

  /** 过期时间(毫秒时间戳) */
  e?: number

  /** 标签 */
  t?: string | number
}

/**
 * 本地存储增强。
 */
export class LocalStoragePlus<T extends JsonValue> {
  /**
   * 本地存储键名前缀。
   */
  private static prefix = 'LSP:'

  /**
   * 获取完全的键名。
   *
   * @param key 键名
   */
  private static getFullKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * 设置本地存储。
   *
   * @param key 键
   * @param value 值
   * @param options 选项
   */
  static set<T extends JsonValue>(
    key: string,
    value: T | ((prevValue: T | null) => T),
    options?: LocalStoragePlusSetOptions,
  ): void {
    const { ttl, tag } = options || {}
    const expiredAt = ttl && Date.now() + ttl
    const nextValue =
      typeof value === 'function' ? value(this.get<T>(key, { tag })) : value
    localStorage.setItem(
      this.getFullKey(key),
      JSON.stringify({
        v: nextValue,
        e: expiredAt,
        t: tag,
      } as LocalStoragePlusRawData<T>),
    )
  }

  /**
   * 获取本地存储。
   *
   * @param key 键
   * @param options 选项
   */
  static get<T extends JsonValue>(
    key: string,
    options?: LocalStoragePlusGetOptions,
  ): T | null {
    const { tag } = options || {}

    try {
      const rawText = localStorage.getItem(this.getFullKey(key))
      if (rawText != null) {
        const rawData = JSON.parse(rawText) as LocalStoragePlusRawData<T>

        if (
          (tag != null && rawData.t !== tag) ||
          (rawData.e != null && rawData.e < Date.now())
        ) {
          return null
        }

        return rawData.v
      }
    } catch {}

    return null
  }

  /**
   * 是否存在本地存储。
   *
   * @param key 键
   * @param options 选项
   */
  static has(key: string, options?: LocalStoragePlusGetOptions): boolean {
    return this.get(key, options) !== null
  }

  /**
   * 删除本地存储。
   *
   * @param key 键
   */
  static remove(key: string): void {
    localStorage.removeItem(this.getFullKey(key))
  }

  /**
   * 清空本地存储。
   */
  static clear(): void {
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i)
      if (key != null && key.indexOf(this.prefix) === 0) {
        localStorage.removeItem(key)
      }
    }
  }

  /**
   * 将本地存储的值增加给定值，若本地存储不存在，则初始化为 `0` 后操作。
   *
   * @param key 键
   * @param value 增加值，默认 `1`
   * @param options 选项
   */
  static increase(
    key: string,
    value = 1,
    options?: LocalStoragePlusSetOptions,
  ): void {
    this.set(
      key,
      (prevValue: number | null) => Number(prevValue || 0) + value,
      options,
    )
  }

  /**
   * 将本地存储的值减少给定值，若本地存储不存在，则初始化为 `0` 后操作。
   *
   * @param key 键
   * @param value 减小值，默认 `1`
   * @param options 选项
   */
  static decrease(
    key: string,
    value = 1,
    options?: LocalStoragePlusSetOptions,
  ): void {
    this.set(
      key,
      (prevValue: number | null) => Number(prevValue || 0) - value,
      options,
    )
  }

  constructor(private options: LocalStoragePlusOptions) {}

  /**
   * 设置值。
   *
   * @param value 值
   * @param options 选项
   */
  set(
    value: T | ((prevValue: T | null) => T),
    options?: LocalStoragePlusSetOptions,
  ): void {
    return LocalStoragePlus.set<T>(this.options.key, value, options)
  }

  /**
   * 获取值。
   *
   * @param options 选项
   */
  get(options?: LocalStoragePlusGetOptions): T | null {
    return LocalStoragePlus.get(this.options.key, options)
  }

  /**
   * 是否存在值。
   *
   * @param options 选项
   */
  has(options?: LocalStoragePlusGetOptions): boolean {
    return LocalStoragePlus.has(this.options.key, options)
  }

  /**
   * 删除值。
   */
  remove(): void {
    return LocalStoragePlus.remove(this.options.key)
  }

  /**
   * 自增。
   *
   * @param value 增加值
   * @param options 选项
   */
  increase(value = 1, options?: LocalStoragePlusSetOptions): void {
    return LocalStoragePlus.increase(this.options.key, value, options)
  }

  /**
   * 自减。
   *
   * @param value 减少值
   * @param options 选项
   */
  decrease(value = 1, options?: LocalStoragePlusSetOptions): void {
    return LocalStoragePlus.decrease(this.options.key, value, options)
  }
}

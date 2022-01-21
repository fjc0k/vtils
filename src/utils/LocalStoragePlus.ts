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
export class LocalStoragePlus<T> {
  private static prefix = 'plus:'

  private key: string

  constructor(private options: LocalStoragePlusOptions) {
    this.key = `${LocalStoragePlus.prefix}${options.key}`
  }

  /**
   * 设置值。
   *
   * @param value 值
   * @param options 选项
   */
  set(value: T, options?: LocalStoragePlusSetOptions): void {
    const { ttl, tag } = options || {}
    const expiredAt = ttl && Date.now() + ttl
    localStorage.setItem(
      this.key,
      JSON.stringify({
        v: value,
        e: expiredAt,
        t: tag,
      } as LocalStoragePlusRawData<T>),
    )
  }

  /**
   * 获取值。
   *
   * @param options 选项
   */
  get(options?: LocalStoragePlusGetOptions): T | null {
    const { tag } = options || {}

    try {
      const rawText = localStorage.getItem(this.key)
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
   * 是否存在值。
   *
   * @param options 选项
   */
  has(options?: LocalStoragePlusGetOptions): boolean {
    return this.get(options) !== null
  }

  /**
   * 删除值。
   */
  remove(): void {
    localStorage.removeItem(this.key)
  }
}

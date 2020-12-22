import Redis from 'ioredis'
import { CookieJar } from 'tough-cookie'
import { isPlainObject } from '../utils'

// @ts-ignore
import _RedisCookieStore from 'tough-cookie-redisstore'
const RedisCookieStore: new (
  cookieKey: string,
  options?: { redis: Redis.Redis } | Redis.RedisOptions,
) => any = _RedisCookieStore

export interface RedisCookieJarOptions extends CookieJar.Options {
  /**
   * 唯一的键名。
   */
  key: string

  /**
   * Redis 实例或选项，内部使用 `ioredis`。
   */
  redis: Redis.Redis | Redis.RedisOptions
}

/**
 * 使用 Redis 作为 Cookie Jar。
 */
export class RedisCookieJar extends CookieJar {
  private static prefix = '@@@@COOKIE@@@@'

  constructor(options: RedisCookieJarOptions) {
    const redis: Redis.Redis = isPlainObject(options.redis)
      ? new Redis(options.redis as any)
      : (options.redis as any)
    super(
      new RedisCookieStore(`${RedisCookieJar.prefix}${options.key}`, { redis }),
      options,
    )
  }
}

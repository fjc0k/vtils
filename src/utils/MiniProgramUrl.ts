import { assign } from 'lodash-uni'
import { createUrlQueryString } from './createUrlQueryString.ts'
import { parseUrlQueryString } from './parseUrlQueryString.ts'

export type MiniProgramUrlProvider = 'wechat'

export type MiniProgramUrlVersion = 'release' | 'develop' | 'trial'

export type MiniProgramUrlStringInput = `mp://${string}`

export type MiniProgramUrlJsonInput = {
  /** 提供商 */
  provider?: MiniProgramUrlProvider
  /** APPID */
  appId?: string
  /** 原始ID */
  rawId?: string
  /** 版本 */
  version?: MiniProgramUrlVersion
  /** 路径 */
  path?: string
  /** 查询参数 */
  query?: Record<string, any>
  /** 额外数据 */
  data?: any
}

export type MiniProgramUrlInput =
  | MiniProgramUrlStringInput
  | MiniProgramUrlJsonInput

/**
 * 小程序链接。
 */
export class MiniProgramUrl {
  private payload: MiniProgramUrlJsonInput = {}

  constructor(payload: MiniProgramUrlInput) {
    if (typeof payload === 'string') {
      this.update(JSON.parse(payload.substring(5)))
    } else {
      this.update(payload)
    }
  }

  private getPath() {
    return (
      (this.payload.path ? this.payload.path.substring(1) : '') +
      (this.payload.query ? `?${createUrlQueryString(this.payload.query)}` : '')
    )
  }

  update(payload: Partial<MiniProgramUrlJsonInput>): this {
    if (payload.path) {
      if (payload.path[0] !== '/') {
        payload.path = `/${payload.path}`
      }
      const [path, query] = payload.path.split('?')
      if (query) {
        payload.path = path
        payload.query = {
          ...parseUrlQueryString(query),
          ...payload.query,
        }
      }
    }
    assign(this.payload, payload)
    return this
  }

  toJson(): MiniProgramUrlJsonInput {
    return this.payload
  }

  toString(): string {
    return `mp://${JSON.stringify(this.payload)}`
  }

  toWxOpenLaunchWeappAttrs() {
    return {
      username: this.payload.rawId,
      path: this.getPath(),
      envVersion: this.payload.version,
      extraData: this.payload.data
        ? JSON.stringify(this.payload.data)
        : undefined,
    }
  }

  toWxNavigateToMiniProgramParams() {
    return {
      appId: this.payload.appId,
      path: this.getPath(),
      envVersion: this.payload.version,
      extraData: this.payload.data,
    }
  }

  static is(
    value: MiniProgramUrlStringInput,
  ): value is MiniProgramUrlStringInput {
    return value.substring(0, 5) === 'mp://'
  }
}

import { DotPath, RequiredDeep } from '../types'
import {
  get,
  includes,
  isArray,
  moveToBottom,
  pick,
  set,
  values,
} from '../utils'
import { VaeArraySchema } from './VaeArraySchema'
import { VaeBooleanSchema } from './VaeBooleanSchema'
import { VaeContext } from './VaeContext'
import { VaeDateSchema } from './VaeDateSchema'
import { VaeError } from './VaeError'
import { VaeIssue } from './VaeIssue'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeNumberSchema } from './VaeNumberSchema'
import { VaeObjectSchema } from './VaeObjectSchema'
import { VaeStringSchema } from './VaeStringSchema'

export type VaeSchemaType =
  | 'string'
  | 'number'
  | 'object'
  | 'date'
  | 'boolean'
  | 'array'

export type VaeSchemaOptions = {
  type: VaeSchemaType
}

export type VaeSchemaPath = Array<string | number>

export type VaeSchemaCheckPayload<T> = {
  fn: ((value: T) => boolean) | VaeSchema
  message: VaeLocaleMessage
  messageParams?: Record<string, any>
  path?: VaeSchemaPath
  tag?: string
}

export type VaeSchemaTransformPayload<T> = (value: T) => T

export type VaeSchemaParseOptions = {
  /**
   * 上下文，内部使用
   *
   * @inner
   */
  ctx?: VaeContext

  /**
   * 是否提前终止
   *
   * @default false
   */
  abortEarly?: boolean

  /**
   * 是否保留未知属性
   *
   * @default false
   */
  preserveUnknownKeys?: boolean
}

export type VaeSchemaParseResult<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      issues: VaeIssue[]
    }

export type VaeSchemaOf<T0, T = RequiredDeep<T0>> =
  // 为何要加 []
  // https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
  [T] extends [string]
    ? VaeStringSchema<T>
    : [T] extends [number]
    ? VaeNumberSchema<T>
    : [T] extends [boolean]
    ? VaeBooleanSchema<T>
    : [T] extends [Date]
    ? VaeDateSchema<T>
    : T extends any[]
    ? VaeArraySchema<T>
    : // @ts-ignore
      VaeObjectSchema<T>

export abstract class VaeSchema<T extends any = any> {
  constructor(private _options: VaeSchemaOptions) {}

  private _label: string | undefined

  private _default: T | (() => T) | undefined

  private _required: boolean | undefined
  private _requiredMessage: VaeLocaleMessage | undefined

  protected _objectKeys: string[] | undefined

  protected _stringTrim: boolean | undefined
  protected _stringEmptyable: boolean | undefined

  private _processors: Array<
    VaeSchemaCheckPayload<T> | VaeSchemaTransformPayload<T>
  > = []

  check(payload: VaeSchemaCheckPayload<T>) {
    this._processors.push(payload)
    return this
  }

  transform(payload: VaeSchemaTransformPayload<T>) {
    this._processors.push(payload)
    return this
  }

  label(label: string) {
    this._label = label
    return this
  }

  default(value: T | (() => T)) {
    this._default = value
    return this
  }

  required(message: VaeLocaleMessage = VaeLocale.base.required) {
    this._required = true
    this._requiredMessage = message
    return this
  }

  optional() {
    this._required = false
    return this
  }

  enum(
    value: T[] | Record<any, T>,
    message: VaeLocaleMessage = VaeLocale.base.enum,
  ) {
    const enumValues = isArray(value) ? value : values(value)
    return this.check({
      fn: v => includes(enumValues, v),
      message: message,
      messageParams: {
        enum: enumValues,
      },
    })
  }

  custom(
    fn: (value: T) => boolean,
    message: VaeLocaleMessage,
    dotPath?: DotPath<T>,
  ) {
    const path = dotPath?.split('.')
    return this.check({ fn, message, path })
  }

  parse(data: T, options?: VaeSchemaParseOptions): VaeSchemaParseResult<T> {
    // 字符串 trim
    if (
      this._stringTrim &&
      this._options.type === 'string' &&
      typeof data === 'string'
    ) {
      data = data.trim() as any
    }

    let dataIsNil =
      data == null ||
      (this._options.type === 'string' && !this._stringEmptyable && data === '')

    // 默认值
    if (dataIsNil && this._default != null) {
      data =
        typeof this._default === 'function'
          ? (this._default as any)()
          : this._default
      dataIsNil =
        data == null ||
        (this._options.type === 'string' &&
          !this._stringEmptyable &&
          data === '')
    }

    // 非必填
    if (dataIsNil && !this._required) {
      return {
        success: true,
        data: data,
      }
    }

    const processors = this._processors.slice()

    // 必填规则始终前置
    if (this._required) {
      processors.unshift({
        fn: () => !dataIsNil,
        message: this._requiredMessage!,
      })
    }

    // 对于数组，将 element 的验证移到最后
    if (this._options.type === 'array') {
      moveToBottom(
        processors,
        processors.findIndex(
          item => typeof item === 'object' && item.tag === 'element',
        ),
      )
    }

    const ctx = options?.ctx || new VaeContext()
    options = options || {}
    options.ctx = ctx

    for (let i = 0; i < processors.length; i++) {
      const processor = processors[i]
      if (typeof processor === 'object') {
        const { fn, message, messageParams, path = [], tag } = processor
        const fullPath = [...ctx.path, ...path]
        if (fn instanceof VaeSchema) {
          const pathData = path.length ? get(data, path) : data
          if (this._options.type === 'array' && tag === 'element') {
            if (pathData) {
              for (let j = 0; j < (pathData as any[]).length; j++) {
                const item = (pathData as any[])[j]
                ctx.setPath([...fullPath, j])
                const res = fn.parse(item, options)
                if (res.success) {
                  set(data as any, [...path, j], res.data)
                } else {
                  if (options.abortEarly) {
                    return {
                      success: false,
                      issues: ctx.issues,
                    }
                  }
                }
                ctx.restorePath()
              }
            }
          } else {
            ctx.setPath(fullPath)
            const res = fn.parse(pathData, options)
            if (res.success) {
              if (path.length) {
                set(data as any, path, res.data)
              } else {
                data = res.data
              }
            } else {
              if (options.abortEarly) {
                return {
                  success: false,
                  issues: ctx.issues,
                }
              }
            }
            ctx.restorePath()
          }
        } else if (!fn(data)) {
          ctx.addIssue({
            path: fullPath,
            message:
              typeof message === 'function'
                ? message({
                    path: fullPath,
                    params: messageParams || {},
                    value: data,
                    label: this._label,
                  })
                : message,
          })
          if (options.abortEarly) {
            return {
              success: false,
              issues: ctx.issues,
            }
          }
          break
        }
      } else {
        data = processor(data)
      }
    }
    if (ctx.issues.length) {
      return {
        success: false,
        issues: ctx.issues,
      }
    }
    return {
      success: true,
      data:
        !options.preserveUnknownKeys &&
        this._options.type === 'object' &&
        this._objectKeys?.length
          ? (pick(data, this._objectKeys) as any)
          : data,
    }
  }

  parseOrThrow(data: T, options?: VaeSchemaParseOptions) {
    const res = this.parse(data, options)
    if (res.success) {
      return res.data
    }
    // TODO: 暂时解决编译报错
    // @ts-ignore
    throw new VaeError(res.issues)
  }
}

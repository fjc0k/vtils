import { RequiredDeep } from '../types'
import { get, moveToBottom, set } from '../utils'
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
  | 'enum'
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

  required(message: VaeLocaleMessage = VaeLocale.base.required) {
    this._required = true
    this._requiredMessage = message
    return this
  }

  default(value: T | (() => T)) {
    this._default = value
    return this
  }

  parse(data: T, ctx?: VaeContext): VaeSchemaParseResult<T> {
    // 默认值
    if (this._default != null && data == null) {
      data =
        typeof this._default === 'function'
          ? (this._default as any)()
          : this._default
    }

    // 非必填
    if (!this._required && data == null) {
      return {
        success: true,
        data: data,
      }
    }

    const processors = this._processors.slice()

    // 必填规则始终前置
    if (this._required) {
      processors.unshift({
        fn: v => v != null,
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

    ctx ??= new VaeContext()

    for (let i = 0; i < processors.length; i++) {
      const processor = processors[i]
      if (typeof processor === 'object') {
        const { fn, message, messageParams, path = [], tag } = processor
        const fullPath = [...ctx.path, ...path]
        if (fn instanceof VaeSchema) {
          const pathData = path.length ? get(data, path) : data
          if (this._options.type === 'array' && tag === 'element') {
            if (pathData) {
              ;(pathData as any[]).forEach((item, index) => {
                ctx!.withPath([...fullPath, index], () => {
                  const res = fn.parse(item, ctx)
                  if (res.success) {
                    set(data as any, [...path, index], res.data)
                  }
                })
              })
            }
          } else {
            ctx.withPath(fullPath, () => {
              const res = fn.parse(pathData, ctx)
              if (res.success) {
                if (path.length) {
                  set(data as any, path, res.data)
                } else {
                  data = res.data
                }
              }
            })
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
      data: data,
    }
  }

  parseOrThrow(data: T) {
    const res = this.parse(data)
    if (res.success) {
      return res.data
    }
    throw new VaeError(res.issues)
  }
}

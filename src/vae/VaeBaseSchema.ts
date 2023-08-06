import { get, moveToBottom, set } from '../utils'
import { VaeContext } from './VaeContext'
import { VaeError } from './VaeError'
import { VaeIssue } from './VaeIssue'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export type VaeBaseSchemaType =
  | 'string'
  | 'number'
  | 'object'
  | 'enum'
  | 'date'
  | 'boolean'
  | 'array'

export type VaeBaseSchemaOptions = {
  type: VaeBaseSchemaType
}

export type VaeBaseSchemaPath = Array<string | number>

export type VaeBaseSchemaCheckPayload<T> = {
  fn: ((value: T) => boolean) | VaeBaseSchema
  message: VaeLocaleMessage
  messageParams?: Record<string, any>
  path?: VaeBaseSchemaPath
  tag?: string
}

export type VaeBaseSchemaTransformPayload<T> = (value: T) => T

export type VaeBaseSchemaParseResult<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      issues: VaeIssue[]
    }

export abstract class VaeBaseSchema<T extends any = any> {
  constructor(private _options: VaeBaseSchemaOptions) {}

  private _label: string | undefined

  private _default: T | (() => T) | undefined

  private _required: boolean | undefined
  private _requiredMessage: VaeLocaleMessage | undefined

  private _processors: Array<
    VaeBaseSchemaCheckPayload<T> | VaeBaseSchemaTransformPayload<T>
  > = []

  check(payload: VaeBaseSchemaCheckPayload<T>) {
    this._processors.push(payload)
    return this
  }

  transform(payload: VaeBaseSchemaTransformPayload<T>) {
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

  parse(data: T, ctx?: VaeContext): VaeBaseSchemaParseResult<T> {
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
        if (fn instanceof VaeBaseSchema) {
          const pathData = path.length ? get(data, path) : data
          if (pathData != null) {
            if (this._options.type === 'array' && tag === 'element') {
              ;(pathData as any[]).forEach((item, index) => {
                ctx!.withPath([...fullPath, index], () => {
                  const res = fn.parse(item, ctx)
                  if (res.success) {
                    set(data as any, [...path, index], res.data)
                  }
                })
              })
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

import { get, set } from '../utils'
import { VaeContext } from './VaeContext'
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

export abstract class VaeBaseSchema<T extends any = any> {
  constructor(private _options: VaeBaseSchemaOptions) {}

  private _label: string | undefined

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
    return this.check({
      fn: v =>
        v != null &&
        // string 时空字符串也视为必填
        (this._options.type === 'string' ? v !== '' : true),
      message: message,
      tag: 'required',
    })
  }

  default(value: T | (() => T)) {
    return this.transform(v =>
      v == null ||
      // string 时空字符串也视为必填
      (this._options.type === 'string' && v === '')
        ? typeof value === 'function'
          ? (value as any)()
          : value
        : v,
    )
  }

  isRequired() {
    return this._processors.some(
      item => typeof item === 'object' && item.tag === 'required',
    )
  }

  safeParse(
    data: T,
    ctx?: VaeContext,
  ):
    | {
        success: true
        data: T
      }
    | {
        success: false
        issues: VaeIssue[]
      } {
    ctx ??= new VaeContext()

    const processors = this._processors.slice()
    // 对于数组，将 element 的验证移到最后
    if (this._options.type === 'array') {
      processors.sort(
        (a, b) =>
          (typeof b === 'object' && b.fn instanceof VaeBaseSchema ? 0 : 1) -
          (typeof a === 'object' && a.fn instanceof VaeBaseSchema ? 0 : 1),
      )
    }

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
                  const res = fn.safeParse(item, ctx)
                  if (res.success) {
                    set(data as any, [...path, index], res.data)
                  }
                })
              })
            } else {
              ctx.withPath(fullPath, () => {
                const res = fn.safeParse(pathData, ctx)
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
}

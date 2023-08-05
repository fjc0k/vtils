import { get } from '../utils'
import { VaeArraySchema } from './VaeArraySchema'
import { VaeContext } from './VaeContext'
import { VaeError } from './VaeError'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export type VaeBaseSchemaPath = Array<string | number>

export type VaeBaseSchemaCheckPayload<T> = {
  fn: ((value: T) => boolean) | VaeBaseSchema
  message: VaeLocaleMessage
  messageParams?: Record<string, any>
  path?: VaeBaseSchemaPath
  tag?: string
}

export type VaeBaseSchemaTransformPayload<T> = (value: T) => T

export abstract class VaeBaseSchema<T = any> {
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
      fn: v => v != null,
      message: message,
      tag: 'required',
    })
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
        error: VaeError
      } {
    const isRoot = !ctx
    ctx ??= new VaeContext()

    const processors = this._processors.slice()
    // 对于数组，将 element 的验证移到最后
    if (this instanceof VaeArraySchema) {
      processors.sort(
        (a, b) =>
          (typeof b === 'object' && b.fn instanceof VaeBaseSchema ? 0 : 1) -
          (typeof a === 'object' && a.fn instanceof VaeBaseSchema ? 0 : 1),
      )
    }

    for (let i = 0; i < processors.length; i++) {
      const processor = processors[i]
      if (typeof processor === 'object') {
        const { fn, message, messageParams, path, tag } = processor
        if (fn instanceof VaeBaseSchema) {
          // const issueCount = ctx.issues.length
          const pathData = path ? get(data, path) : data
          if (pathData != null) {
            if (this instanceof VaeArraySchema && tag === 'element') {
              ;(pathData as any[]).forEach((item, index) => {
                ctx!.withPath([...ctx!.path, ...(path || []), index], () =>
                  fn.safeParse(item, ctx),
                )
              })
            } else {
              ctx.withPath([...ctx!.path, ...(path || [])], () =>
                fn.safeParse(pathData, ctx),
              )
            }
          }
          // if (ctx.issues.length > issueCount) {
          //   break
          // }
        } else if (!fn(data)) {
          const fullPath = [...ctx.path, ...(path || [])]
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
    if (isRoot) {
      if (ctx.issues.length) {
        return {
          success: false,
          error: new VaeError(ctx.issues),
        }
      }
      return {
        success: true,
        data: data,
      }
    }
    return {} as any
  }
}

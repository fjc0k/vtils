import { get } from 'lodash-uni'
import { VaeArraySchema } from './VaeArraySchema'
import { VaeContext } from './VaeContext'
import { VaeError } from './VaeError'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export type VaeBaseSchemaPath = Array<string | number>

export type VaeBaseSchemaCheckPayload<T> =
  | {
      transform?: false
      fn: ((value: T) => boolean) | VaeBaseSchema
      message: VaeLocaleMessage
      path?: VaeBaseSchemaPath
      tag?: string
    }
  | {
      transform: true
      fn: (value: T) => T
      message?: undefined
      path?: undefined
      tag?: undefined
    }

export abstract class VaeBaseSchema<T = any> {
  private checks: VaeBaseSchemaCheckPayload<T>[] = []

  check(payload: VaeBaseSchemaCheckPayload<T>) {
    this.checks.push(payload)
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
    return this.checks.some(item => item.tag === 'required')
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
    for (let i = 0; i < this.checks.length; i++) {
      const check = this.checks[i]
      if (!check.transform) {
        const { fn, message, path, tag } = check
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
          ctx.addIssue({
            path: [...ctx.path, ...(path || [])],
            message: message,
          })
          break
        }
      } else {
        data = check.fn(data)
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

import { get } from 'lodash-uni'
import { VaeContext } from './VaeContext'
import { VaeError } from './VaeError'
import { VaeLocaleMessage } from './VaeLocale'

export type VaeBaseSchemaPath = Array<string | number>

export type VaeBaseSchemaCheckPayload<T> = {
  fn: ((value: T) => boolean) | VaeBaseSchema
  message: VaeLocaleMessage
  path?: VaeBaseSchemaPath
  tag?: string
}

// export type VaeBaseSchemaPayload<T> = {
//   /** 上下文 */
//   ctx: VaeContext

//   /** 当前值路径 */
//   path: VaeBaseSchemaPath

//   /** 当前值 */
//   value: T
// }

export abstract class VaeBaseSchema<T = any> {
  private checks: VaeBaseSchemaCheckPayload<T>[] = []

  check(payload: VaeBaseSchemaCheckPayload<T>) {
    this.checks.push(payload)
    return this
  }

  required() {
    return this.check({
      fn: v => v != null,
      message: '必填',
      tag: 'required',
      path: [],
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
      const { fn, message, path } = this.checks[i]
      if (fn instanceof VaeBaseSchema) {
        ctx.withPath(path || [], () => fn.safeParse(get(data, ctx!.path), ctx))
      } else if (!fn(data)) {
        ctx.addIssue({
          path: ctx.getPathSnapshot(),
          message: message,
        })
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

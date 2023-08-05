import { VaeContext } from './VaeContext'
import { VaeError } from './VaeError'
import { VaeLocaleMessage } from './VaeLocale'

export type VaeBaseSchemaPath = Array<string | number>

// export type VaeBaseSchemaPayload<T> = {
//   /** 上下文 */
//   ctx: VaeContext

//   /** 当前值路径 */
//   path: VaeBaseSchemaPath

//   /** 当前值 */
//   value: T
// }

export abstract class VaeBaseSchema<T = any> {
  private checks: Array<{
    check: (value: T) => boolean
    message: VaeLocaleMessage
  }> = []

  check(check: (value: T) => boolean, message: VaeLocaleMessage) {
    this.checks.push({
      check,
      message,
    })
    return this
  }

  required() {
    return this.check(v => v != null, '必填')
  }

  safeParse(data: T):
    | {
        success: true
        data: T
      }
    | {
        success: false
        error: VaeError
      } {
    const ctx = new VaeContext()
    for (let i = 0; i < this.checks.length; i++) {
      const { check, message } = this.checks[i]
      if (!check(data)) {
        ctx.addIssue({
          path: [],
          message: message,
        })
      }
    }
    if (ctx.issues.length) {
      return {
        success: false,
        error: new VaeError(),
      }
    }
    return {
      success: true,
      data: data,
    }
  }
}

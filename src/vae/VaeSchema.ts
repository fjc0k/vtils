import {
  DotPath,
  DotPathValue,
  OneOrMore,
  RequiredBy,
  RequiredDeep,
} from '../types'
import {
  assign,
  castArray,
  cloneDeepFast,
  get,
  includes,
  isArray,
  moveToBottom,
  pick,
  set,
  toArray,
  toPlainObject,
  values,
} from '../utils'
import { VaeArraySchema } from './VaeArraySchema'
import { VaeBooleanSchema } from './VaeBooleanSchema'
import { VaeDateSchema } from './VaeDateSchema'
import { VaeError } from './VaeError'
import { VaeIssue } from './VaeIssue'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeNumberSchema } from './VaeNumberSchema'
import { VaeObjectSchema } from './VaeObjectSchema'
import { VaeSchemaParseContext } from './VaeSchemaParseContext'
import { VaeSchemaReachContext } from './VaeSchemaReachContext'
import { VaeStringSchema } from './VaeStringSchema'

export type VaeSchemaType =
  | 'string'
  | 'number'
  | 'object'
  | 'date'
  | 'boolean'
  | 'array'

export type VaeSchemaOptions<T> = {
  type: VaeSchemaType
  label?: string
  default?: T | (() => T)
  required?: boolean
  requiredMessage?: VaeLocaleMessage
  objectKeys?: string[]
  stringTrim?: boolean
  stringEmptyable?: boolean
  processors?: Array<VaeSchemaCheckPayload<T> | VaeSchemaTransformPayload<T>>
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
  ctx?: VaeSchemaParseContext

  /**
   * 当前路径，内部使用
   *
   * @inner
   */
  curPath?: VaeSchemaPath

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

  /**
   * 是否 cast 模式
   *
   * @default false
   */
  cast?: boolean
}

export type VaeSchemaCastOptions = {
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
  protected _options!: RequiredBy<VaeSchemaOptions<T>, 'processors'>

  constructor(options: VaeSchemaOptions<T>) {
    this._options = {
      ...options,
      processors: options.processors || [],
    }
  }

  check(payload: VaeSchemaCheckPayload<T>) {
    this._options.processors.push(payload)
    return this
  }

  transform(payload: VaeSchemaTransformPayload<T>) {
    this._options.processors.push(payload)
    return this
  }

  label(label: string) {
    this._options.label = label
    return this
  }

  default(value: T | (() => T)) {
    this._options.default = value
    return this
  }

  required(message: VaeLocaleMessage = VaeLocale.base.required) {
    this._options.required = true
    this._options.requiredMessage = message
    return this
  }

  optional() {
    this._options.required = false
    this._options.requiredMessage = undefined
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

  clone() {
    // https://stackoverflow.com/a/44782052
    const newSchema: this = assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    )
    newSchema._options = cloneDeepFast(
      newSchema._options,
      v => v instanceof VaeSchema,
    )
    newSchema._options.processors.forEach(item => {
      if (typeof item === 'object' && item.fn instanceof VaeSchema) {
        item.fn = item.fn.clone()
      }
    })
    return newSchema
  }

  reach<P extends DotPath<T>>(
    paths: P[],
    ctx?: VaeSchemaReachContext,
    curPath?: VaeSchemaPath,
  ): {
    [K in P]: VaeSchemaOf<DotPathValue<T, K>>
  }
  reach<P extends DotPath<T>>(
    path: P,
    ctx?: VaeSchemaReachContext,
    curPath?: VaeSchemaPath,
  ): VaeSchemaOf<DotPathValue<T, P>>
  reach(
    path: OneOrMore<string>,
    ctx?: VaeSchemaReachContext,
    curPath?: VaeSchemaPath,
  ): any {
    const paths = castArray(path)
    const isRoot = !ctx
    ctx = ctx ?? new VaeSchemaReachContext()
    curPath = curPath ?? []

    const currentDotPath = curPath.join('.')
    if (paths.includes(currentDotPath)) {
      ctx.addSchema(currentDotPath, this)
    }

    for (let i = 0; i < this._options.processors.length; i++) {
      const processor = this._options.processors[i]
      if (typeof processor === 'object') {
        if (processor.fn instanceof VaeSchema) {
          const fullPath = [...curPath, ...(processor.path || [])]
          if (this._options.type === 'array' && processor.tag === 'element') {
            processor.fn.reach(paths, ctx, [...fullPath, 0])
          } else {
            processor.fn.reach(paths, ctx, fullPath)
          }
        }
      }
    }

    if (!isRoot) {
      return
    }

    const res = ctx.schemas.reduce((res, item) => {
      res[item.path] = item.schema
      return res
    }, {} as any)

    return typeof path === 'string' ? res[path] : res
  }

  parse(data: T, options?: VaeSchemaParseOptions): VaeSchemaParseResult<T> {
    // 字符串 trim
    if (
      this._options.stringTrim &&
      this._options.type === 'string' &&
      typeof data === 'string'
    ) {
      data = data.trim() as any
    }

    let dataIsNil =
      data == null ||
      (this._options.type === 'string' &&
        !this._options.stringEmptyable &&
        data === '')

    // 默认值
    if (dataIsNil && this._options.default != null) {
      data =
        typeof this._options.default === 'function'
          ? (this._options.default as any)()
          : this._options.default
      dataIsNil =
        data == null ||
        (this._options.type === 'string' &&
          !this._options.stringEmptyable &&
          data === '')
    }

    // 非必填
    if (dataIsNil && !this._options.required) {
      return {
        success: true,
        data: data,
      }
    }

    const processors = this._options.processors.slice()

    // 必填规则始终前置
    if (this._options.required) {
      processors.unshift({
        fn: () => !dataIsNil,
        message: this._options.requiredMessage!,
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

    const ctx = options?.ctx ?? new VaeSchemaParseContext()
    const curPath = options?.curPath ?? []
    options = options || {}
    options.ctx = ctx
    options.curPath = curPath

    for (let i = 0; i < processors.length; i++) {
      const processor = processors[i]
      if (typeof processor === 'object') {
        const { fn, message, messageParams, path = [], tag } = processor
        const fullPath = [...curPath, ...path]
        if (fn instanceof VaeSchema) {
          const pathData = path.length ? get(data, path) : data
          if (this._options.type === 'array' && tag === 'element') {
            if (pathData) {
              for (let j = 0; j < (pathData as any[]).length; j++) {
                const item = (pathData as any[])[j]
                const res = fn.parse(item, {
                  ...options,
                  curPath: [...fullPath, j],
                })
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
              }
            }
          } else {
            const res = fn.parse(pathData, { ...options, curPath: fullPath })
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
          }
        } else if (!fn(data)) {
          if (options.cast) {
            data = dataIsNil
              ? data
              : this._options.type === 'string'
              ? String(data)
              : this._options.type === 'number'
              ? Number(data)
              : this._options.type === 'boolean'
              ? Boolean(data)
              : this._options.type === 'date'
              ? new Date(data as any)
              : this._options.type === 'array'
              ? toArray(data)
              : this._options.type === 'object'
              ? toPlainObject(data)
              : null
          } else {
            ctx.addIssue({
              path: fullPath,
              message:
                typeof message === 'function'
                  ? message({
                      path: fullPath,
                      params: messageParams || {},
                      value: data,
                      label: this._options.label,
                    })
                  : message,
            })
            if (options.abortEarly) {
              return {
                success: false,
                issues: ctx.issues,
              }
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
        this._options.objectKeys?.length
          ? (pick(data, this._options.objectKeys) as any)
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

  cast(data: any, options?: VaeSchemaCastOptions): any {
    const res = this.parse(data, {
      cast: true,
      preserveUnknownKeys: options?.preserveUnknownKeys,
    })
    // @ts-ignore
    return res.data
  }
}

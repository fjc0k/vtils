import { DotPath, DotPathValue, OneOrMore, RequiredBy } from '../types/index.ts'
import {
  assign,
  castArray,
  cloneDeepFast,
  findIndex,
  get,
  includes,
  isArray,
  moveToBottom,
  pick,
  set,
  toArray,
  toPlainObject,
  values,
} from '../utils/index.ts'
import { VaeArraySchema } from './VaeArraySchema.ts'
import { VaeBooleanSchema } from './VaeBooleanSchema.ts'
import { VaeDateSchema } from './VaeDateSchema.ts'
import { VaeError } from './VaeError.ts'
import { VaeIssue } from './VaeIssue.ts'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale.ts'
import { VaeNumberSchema } from './VaeNumberSchema.ts'
import { VaeObjectSchema } from './VaeObjectSchema.ts'
import { VaeSchemaParseContext } from './VaeSchemaParseContext.ts'
import { VaeSchemaReachContext } from './VaeSchemaReachContext.ts'
import { VaeStringSchema } from './VaeStringSchema.ts'

export type VaeSchemaType =
  | 'string'
  | 'number'
  | 'object'
  | 'date'
  | 'boolean'
  | 'array'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VaeSchemaCustomMetadata {}
export type VaeSchemaMetadata = keyof VaeSchemaCustomMetadata extends never
  ? Record<any, any>
  : VaeSchemaCustomMetadata

export type VaeSchemaOptions<T, S> = {
  type: VaeSchemaType
  label?: string
  default?: T | (() => T)
  required?: boolean
  requiredMessage?: VaeLocaleMessage
  objectKeys?: string[]
  stringTrim?: boolean
  stringEmptyable?: boolean
  processors?: Array<VaeSchemaCheckPayload<T> | VaeSchemaTransformPayload<T>>
  runtime?: VaeSchemaRuntimeFn<T, S>
  metadata?: VaeSchemaMetadata
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

export type VaeSchemaRuntimeFn<T, S> = (payload: { value: T; schema: S }) => any

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
      message: string
    }

export type VaeSchemaOf<T0, T extends NonNullable<T0> = NonNullable<T0>> = // 为何要加 []
  // https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
  [T] extends [string]
    ? // @ts-ignore
      VaeStringSchema<T0>
    : [T] extends [number]
    ? // @ts-ignore
      VaeNumberSchema<T0>
    : [T] extends [boolean]
    ? // @ts-ignore
      VaeBooleanSchema<T0>
    : [T] extends [Date]
    ? // @ts-ignore
      VaeDateSchema<T0>
    : T extends any[]
    ? // @ts-ignore
      VaeArraySchema<T0>
    : // @ts-ignore
      VaeObjectSchema<T0>

export abstract class VaeSchema<
  T0 extends any = any,
  T extends NonNullable<T0> = NonNullable<T0>,
> {
  protected _options!: RequiredBy<VaeSchemaOptions<T, any>, 'processors'>

  constructor(options: VaeSchemaOptions<T, any>) {
    this._options = {
      ...options,
      processors: options.processors || [],
    }
  }

  get options() {
    return this._options
  }

  meta(metadata: VaeSchemaMetadata) {
    this._options.metadata = metadata
    return this
  }

  check(payload: VaeSchemaCheckPayload<T>) {
    const index = payload.tag
      ? findIndex(
          this._options.processors,
          item => typeof item === 'object' && item.tag === payload.tag,
        )
      : -1
    if (index !== -1) {
      this._options.processors[index] = payload
    } else {
      this._options.processors.push(payload)
    }
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
      tag: 'enum',
    })
  }

  custom(
    fn: (value: T) => boolean,
    messageOrOptions?:
      | VaeLocaleMessage
      | {
          message?: VaeLocaleMessage
          path?: DotPath<T>
          tag?: string
        },
  ) {
    if (!messageOrOptions || typeof messageOrOptions !== 'object') {
      messageOrOptions = {
        message: messageOrOptions,
      }
    }
    const message = messageOrOptions.message || VaeLocale.base.custom
    // @ts-ignore
    const path = messageOrOptions.path?.split('.')
    const tag = messageOrOptions.tag && `custom_${messageOrOptions.tag}`
    return this.check({
      fn,
      message,
      path,
      tag,
    })
  }

  runtime(fn: VaeSchemaRuntimeFn<T, this>) {
    this._options.runtime = fn
    return this
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

  parse(data: T0, options?: VaeSchemaParseOptions): VaeSchemaParseResult<T0> {
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

    // 运行时
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let schema = this
    if (this._options.runtime) {
      schema = this.clone()
      this._options.runtime({
        // @ts-expect-error
        value: data,
        schema: schema,
      })
    }

    const processors = schema._options.processors.slice()

    // 必填规则始终前置
    if (schema._options.required) {
      processors.unshift({
        fn: () => !dataIsNil,
        message: schema._options.requiredMessage!,
      })
    }

    // 对于数组，将 element 的验证移到最后
    if (schema._options.type === 'array') {
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
          if (schema._options.type === 'array' && tag === 'element') {
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
                      message: ctx.issues[0].message,
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
                  message: ctx.issues[0].message,
                }
              }
            }
          }
        } else if (
          !fn(
            // @ts-expect-error
            data,
          )
        ) {
          if (options.cast) {
            data = dataIsNil
              ? data
              : schema._options.type === 'string'
              ? String(data)
              : schema._options.type === 'number'
              ? Number(data)
              : schema._options.type === 'boolean'
              ? Boolean(data)
              : schema._options.type === 'date'
              ? new Date(data as any)
              : schema._options.type === 'array'
              ? toArray(data)
              : schema._options.type === 'object'
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
                      label: schema._options.label,
                    })
                  : message,
            })
            if (options.abortEarly) {
              return {
                success: false,
                issues: ctx.issues,
                message: ctx.issues[0].message,
              }
            }
          }
          break
        }
      } else {
        // @ts-expect-error
        data = processor(data)
      }
    }
    if (ctx.issues.length) {
      return {
        success: false,
        issues: ctx.issues,
        message: ctx.issues[0].message,
      }
    }
    return {
      success: true,
      data:
        !options.preserveUnknownKeys &&
        schema._options.type === 'object' &&
        schema._options.objectKeys?.length
          ? (pick(data, schema._options.objectKeys) as any)
          : data,
    }
  }

  parseOrThrow(data: T0, options?: VaeSchemaParseOptions) {
    const res = this.parse(data, options)
    if (res.success) {
      return res.data
    }
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

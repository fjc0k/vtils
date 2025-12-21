import { Nullable, PartialBy, RequiredBy } from '../types'
import {
  difference,
  find,
  includes,
  intersection,
  isPlainObject,
  startsWith,
} from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema, VaeSchemaOf } from './VaeSchema'

export type VaeObjectSchemaShapeOf<T> = {
  [K in keyof T]-?: VaeSchemaOf<T[K]>
}

export class VaeObjectSchema<
  T0 extends Nullable<Record<any, any>> = Record<any, any>,
  T extends NonNullable<T0> = NonNullable<T0>,
> extends VaeSchema<T0> {
  constructor(
    shape?: VaeObjectSchemaShapeOf<T>,
    message: VaeLocaleMessage = VaeLocale.object.type,
  ) {
    super({
      type: 'object',
    })

    this.check({
      fn: isPlainObject,
      message: message,
    })

    if (shape) {
      this.shape(shape)
    }
  }

  /**
   * 对象定义
   */
  shape(shape: VaeObjectSchemaShapeOf<T>) {
    const keys = Object.keys(shape)
    this._options.objectKeys = keys
    keys.forEach(key => {
      this.check({
        fn: (shape as any)[key],
        path: [key],
        message: '',
        tag: `field_${key}`,
      })
    })
    return this
  }

  /**
   * 原地挑选给定字段
   */
  pickFields<K extends keyof T>(keys: K[]): VaeObjectSchema<Pick<T, K>> {
    this._options.processors = this._options.processors.filter(item =>
      typeof item === 'object' && startsWith(item.tag, 'field_')
        ? includes(keys as any, item.path![0])
        : true,
    )
    this._options.objectKeys = intersection(
      this._options.objectKeys,
      keys as any,
    )
    return this as any
  }

  /**
   * 原地剔除给定字段
   */
  omitFields<K extends keyof T>(keys: K[]): VaeObjectSchema<Omit<T, K>> {
    this._options.processors = this._options.processors.filter(item =>
      typeof item === 'object' && startsWith(item.tag, 'field_')
        ? !includes(keys as any, item.path![0])
        : true,
    )
    this._options.objectKeys = difference(this._options.objectKeys, keys as any)
    return this as any
  }

  /**
   * 原地将给定字段设为可选
   */
  optionalFields<K extends keyof T>(keys: K[]): VaeObjectSchema<PartialBy<T, K>>
  /**
   * 原地将所有字段设为可选
   */
  optionalFields(): VaeObjectSchema<Partial<T>>
  optionalFields(keys?: string[]): any {
    this._options.processors.forEach(item => {
      if (
        typeof item === 'object' &&
        startsWith(item.tag, 'field_') &&
        (keys ? includes(keys as any, item.path![0]) : true)
      ) {
        ;(item.fn as VaeSchema).optional()
      }
    })
    return this
  }

  /**
   * 原地将给定字段设为必填
   */
  requiredFields<K extends keyof T>(
    keys: K[],
  ): VaeObjectSchema<RequiredBy<T, K>>
  /**
   * 原地将所有字段设为必填
   */
  requiredFields(): VaeObjectSchema<Required<T>>
  requiredFields(keys?: string[]): any {
    this._options.processors.forEach(item => {
      if (
        typeof item === 'object' &&
        startsWith(item.tag, 'field_') &&
        (keys ? includes(keys as any, item.path![0]) : true)
      ) {
        ;(item.fn as VaeSchema).required()
      }
    })
    return this
  }

  /**
   * 返回给定字段的定义
   */
  shapeOfFields<K extends keyof T>(
    keys: K[],
  ): VaeObjectSchemaShapeOf<Pick<T, K>>
  /**
   * 返回全部字段的定义
   */
  shapeOfFields(): VaeObjectSchemaShapeOf<T>
  shapeOfFields(keys?: string[]) {
    const shape: Record<any, any> = {}
    this._options.processors.forEach(item => {
      if (
        typeof item === 'object' &&
        startsWith(item.tag, 'field_') &&
        (keys ? includes(keys as any, item.path![0]) : true)
      ) {
        shape[item.path![0]] = item.fn
      }
    })
    return shape
  }

  /**
   * 给定字段中至少有一个必填
   */
  requiredFieldsAtLeastOne<K extends keyof T>(
    keys: K[],
    message: VaeLocaleMessage = VaeLocale.object.requiredFieldsAtLeastOne,
  ) {
    return this.check({
      fn: (v: any) => {
        for (const key of keys) {
          if (v[key] == null) {
            continue
          }
          if (v[key] === '') {
            const schema: VaeSchema | undefined = find(
              this._options.processors,
              item =>
                typeof item === 'object' &&
                startsWith(item.tag, 'field_') &&
                item.path![0] === key,
            ) as any
            if (!schema) {
              continue
            }
            if (
              schema.options.type === 'string' &&
              !schema.options.stringEmptyable
            ) {
              continue
            }
          }
          return true
        }
        return false
      },
      message: message,
      messageParams: {
        keys: keys,
      },
      tag: 'requiredFieldsAtLeastOne',
    })
  }
}

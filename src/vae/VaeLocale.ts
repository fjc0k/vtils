import { formatDate } from '../date'
import { VaeSchemaPath } from './VaeSchema'

export type VaeLocaleMessagePayload = {
  label?: string
  path: VaeSchemaPath
  value: any
  params: Record<string, any>
}

export type VaeLocaleMessage =
  | string
  | ((payload: VaeLocaleMessagePayload) => string)

export type VaeLocaleShape = {
  base: Record<'required', VaeLocaleMessage>
  string: Record<
    | 'type'
    | 'nonempty'
    | 'min'
    | 'max'
    | 'length'
    | 'email'
    | 'url'
    | 'regex'
    | 'includes'
    | 'startsWith'
    | 'endsWith'
    | 'phoneNumber'
    | 'idCardNumber',
    VaeLocaleMessage
  >
  object: Record<'type', VaeLocaleMessage>
  number: Record<
    | 'type'
    | 'min'
    | 'max'
    | 'lessThan'
    | 'moreThan'
    | 'integer'
    | 'positive'
    | 'nonpositive'
    | 'negative'
    | 'nonnegative'
    | 'positiveInteger',
    VaeLocaleMessage
  >
  boolean: Record<'type', VaeLocaleMessage>
  array: Record<
    'type' | 'nonempty' | 'min' | 'max' | 'length',
    VaeLocaleMessage
  >
  enum: Record<'type', VaeLocaleMessage>
  date: Record<'type' | 'min' | 'max', VaeLocaleMessage>
}

export class VaeLocaleBuilder {
  static zhCN(options: {
    getLabel: (payload: VaeLocaleMessagePayload) => string
  }): VaeLocaleShape {
    return {
      base: {
        required: payload => `${options.getLabel(payload)}应必填`,
      },

      string: {
        type: payload => `${options.getLabel(payload)}应是字符串类型`,
        nonempty: payload => `${options.getLabel(payload)}应非空`,
        min: payload =>
          `${options.getLabel(payload)}应至少包含${payload.params.min}位字符`,
        max: payload =>
          `${options.getLabel(payload)}应最多包含${payload.params.max}位字符`,
        length: payload =>
          `${options.getLabel(payload)}应仅包含${payload.params.length}位字符`,
        email: payload => `${options.getLabel(payload)}应是一个合法的邮箱`,
        url: payload => `${options.getLabel(payload)}应是一个合法的网址`,
        regex: payload =>
          `${options.getLabel(payload)}应满足正则表达式${payload.params.regex}`,
        includes: payload =>
          `${options.getLabel(payload)}应包含字符串${payload.params.includes}`,
        startsWith: payload =>
          `${options.getLabel(payload)}应以字符串${
            payload.params.startsWith
          }开头`,
        endsWith: payload =>
          `${options.getLabel(payload)}应以字符串${
            payload.params.endsWith
          }结尾`,
        phoneNumber: payload =>
          `${options.getLabel(payload)}应是一个合法的手机号码`,
        idCardNumber: payload =>
          `${options.getLabel(payload)}应是一个合法的身份证号码`,
      },

      object: {
        type: payload => `${options.getLabel(payload)}应是对象类型`,
      },

      number: {
        type: payload => `${options.getLabel(payload)}应是数值类型`,
        min: payload =>
          `${options.getLabel(payload)}应大于或等于${payload.params.min}`,
        max: payload =>
          `${options.getLabel(payload)}应小于或等于${payload.params.max}`,
        lessThan: payload =>
          `${options.getLabel(payload)}应小于${payload.params.lessThan}`,
        moreThan: payload =>
          `${options.getLabel(payload)}应大于${payload.params.moreThan}`,
        integer: payload => `${options.getLabel(payload)}应是一个整数`,
        positive: payload => `${options.getLabel(payload)}应是一个正数`,
        nonpositive: payload => `${options.getLabel(payload)}应是一个非正数`,
        negative: payload => `${options.getLabel(payload)}应是一个负数`,
        nonnegative: payload => `${options.getLabel(payload)}应是一个非负数`,
        positiveInteger: payload =>
          `${options.getLabel(payload)}应是一个正整数`,
      },

      boolean: {
        type: payload => `${options.getLabel(payload)}应是布尔类型`,
      },

      array: {
        type: payload => `${options.getLabel(payload)}应是数组类型`,
        nonempty: payload => `${options.getLabel(payload)}应非空`,
        min: payload =>
          `${options.getLabel(payload)}应至少包含${payload.params.min}个元素`,
        max: payload =>
          `${options.getLabel(payload)}应最多包含${payload.params.max}个元素`,
        length: payload =>
          `${options.getLabel(payload)}应仅包含${payload.params.max}个元素`,
      },

      enum: {
        type: payload =>
          `${options.getLabel(
            payload,
          )}应是下列值之一:${payload.params.enum.join(',')}`,
      },

      date: {
        type: payload => `${options.getLabel(payload)}应是日期类型`,
        min: payload =>
          `${options.getLabel(payload)}应大于或等于${formatDate(
            payload.params.min,
            'yyyy-mm-dd hh:ii:ss',
          )}`,
        max: payload =>
          `${options.getLabel(payload)}应小于或等于${formatDate(
            payload.params.max,
            'yyyy-mm-dd hh:ii:ss',
          )}`,
      },
    }
  }
}

export const VaeLocale = {
  ...VaeLocaleBuilder.zhCN({
    getLabel: payload => payload.label || payload.path.join('.') || '.',
  }),
  $set: (locale: VaeLocaleShape) => {
    Object.assign(VaeLocale, locale)
  },
}

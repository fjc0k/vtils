/* istanbul ignore file */
import { yup } from '../yup.js'

export const getZhCN = (options: {
  getLabel: (params: yup.LocaleValueFnParams) => string
}): yup.Locale => {
  const { getLabel } = options
  return {
    mixed: {
      default: params => `${getLabel(params)}错误`,
      required: params => `${getLabel(params)}必填`,
      oneOf: params => `${getLabel(params)}必须是下列值之一: ${params.values}`,
      notOneOf: params =>
        `${getLabel(params)}必须不是下列值之一: ${params.values}`,
      defined: params => `${getLabel(params)}必须已定义`,
      notType: params =>
        `${getLabel(params)}必须是一个${
          params.type === 'number'
            ? '数字'
            : params.type === 'string'
            ? '字符串'
            : params.type === 'boolean'
            ? '布尔值'
            : params.type === 'object'
            ? '对象'
            : params.type === 'array'
            ? '数组'
            : params.type === 'date'
            ? '日期'
            : ` ${params.type} 类型的值`
        }`,
    },
    string: {
      length: params => `${getLabel(params)}必须仅包含${params.length}位字符`,
      min: params => `${getLabel(params)}至少应包含${params.min}位字符`,
      max: params => `${getLabel(params)}最多可包含${params.max}位字符`,
      matches: params =>
        `${getLabel(params)}必须匹配该正则表达式: ${params.regex}`,
      email: params => `${getLabel(params)}必须是一个合法的邮箱`,
      url: params =>
        `${getLabel(params)}必须是一个以 http:// 或 https:// 开头的网络链接`,
      trim: params => `${getLabel(params)}必须是一个没有旁白的字符串`,
      lowercase: params => `${getLabel(params)}必须是一个小写的字符串`,
      uppercase: params => `${getLabel(params)}必须是一个大写的字符串`,
      chineseMobilePhoneNumber: params =>
        `${getLabel(params)}必须是一个合法的手机号码`,
      chineseIDCardNumber: params =>
        `${getLabel(params)}必须是一个合法的身份证号码`,
    },
    number: {
      min: params => `${getLabel(params)}必须大于或等于${params.min}`,
      max: params => `${getLabel(params)}必须小于或等于${params.max}`,
      lessThan: params => `${getLabel(params)}必须小于${params.less}`,
      moreThan: params => `${getLabel(params)}必须大于${params.more}`,
      positive: params => `${getLabel(params)}必须是一个正数`,
      negative: params => `${getLabel(params)}必须是一个负数`,
      integer: params => `${getLabel(params)}必须是一个整数`,
      id: params => `${getLabel(params)}必须是一个正整数`,
      positiveInteger: params => `${getLabel(params)}必须是一个正整数`,
      negativeInteger: params => `${getLabel(params)}必须是一个负整数`,
      nonPositive: params => `${getLabel(params)}必须是一个非正数`,
      nonNegative: params => `${getLabel(params)}必须是一个非负数`,
      nonPositiveInteger: params => `${getLabel(params)}必须是一个非正整数`,
      nonNegativeInteger: params => `${getLabel(params)}必须是一个非负整数`,
    },
    date: {
      min: params => `${getLabel(params)}必须晚于${params.min}`,
      max: params => `${getLabel(params)}必须早于${params.max}`,
    },
    boolean: {},
    object: {
      noUnknown: params =>
        `${getLabel(params)}上有未定义的键: ${params.unknown}`,
    },
    array: {
      min: params => `${getLabel(params)}至少应包含${params.min}个元素`,
      max: params => `${getLabel(params)}最多可包含${params.max}个元素`,
    },
  }
}

export const zhCN = getZhCN({
  getLabel: params => params.label || '此项',
})

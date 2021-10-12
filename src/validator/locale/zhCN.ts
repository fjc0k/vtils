/* istanbul ignore file */
import { yup } from '../yup'

export const zhCN: yup.Locale = {
  mixed: {
    default: ({ label }) => `${label || '此项'}错误`,
    required: ({ label }) => `${label || '此项'}必填`,
    oneOf: ({ label, values }) =>
      `${label || '此项'}必须是下列值之一: ${values}`,
    notOneOf: ({ label, values }) =>
      `${label || '此项'}必须不是下列值之一: ${values}`,
    defined: ({ label }) => `${label || '此项'}必须已定义`,
    notType: ({ label, type }) =>
      `${label || '此项'}必须是一个${
        type === 'number'
          ? '数字'
          : type === 'string'
          ? '字符串'
          : type === 'boolean'
          ? '布尔值'
          : type === 'object'
          ? '对象'
          : type === 'array'
          ? '数组'
          : type === 'date'
          ? '日期'
          : ` ${type} 类型的值`
      }`,
  },
  string: {
    length: ({ label, length }) =>
      `${label || '此项'}必须仅包含${length}位字符`,
    min: ({ label, min }) => `${label || '此项'}至少应包含${min}位字符`,
    max: ({ label, max }) => `${label || '此项'}最多可包含${max}位字符`,
    matches: ({ label, regex }) =>
      `${label || '此项'}必须匹配该正则表达式: ${regex}`,
    email: ({ label }) => `${label || '此项'}必须是一个合法的邮箱`,
    url: ({ label }) =>
      `${label || '此项'}必须是一个以 http:// 或 https:// 开头的网络链接`,
    trim: ({ label }) => `${label || '此项'}必须是一个没有旁白的字符串`,
    lowercase: ({ label }) => `${label || '此项'}必须是一个小写的字符串`,
    uppercase: ({ label }) => `${label || '此项'}必须是一个大写的字符串`,
    chineseMobilePhoneNumber: ({ label }) =>
      `${label || '此项'}必须是一个合法的手机号码`,
    chineseIDCardNumber: ({ label }) =>
      `${label || '此项'}必须是一个合法的身份证号码`,
  },
  number: {
    min: ({ label, min }) => `${label || '此项'}必须大于或等于${min}`,
    max: ({ label, max }) => `${label || '此项'}必须小于或等于${max}`,
    lessThan: ({ label, less }) => `${label || '此项'}必须小于${less}`,
    moreThan: ({ label, more }) => `${label || '此项'}必须大于${more}`,
    positive: ({ label }) => `${label || '此项'}必须是一个正数`,
    negative: ({ label }) => `${label || '此项'}必须是一个负数`,
    integer: ({ label }) => `${label || '此项'}必须是一个整数`,
    id: ({ label }) => `${label || '此项'}必须是一个正整数`,
  },
  date: {
    min: ({ label, min }) => `${label || '此项'}必须晚于${min}`,
    max: ({ label, max }) => `${label || '此项'}必须早于${max}`,
  },
  boolean: {},
  object: {
    noUnknown: ({ label, unknown }) =>
      `${label || '此项'}上有未定义的键: ${unknown}`,
  },
  array: {
    min: ({ label, min }) => `${label || '此项'}至少应包含${min}个元素`,
    max: ({ label, max }) => `${label || '此项'}最多可包含${max}个元素`,
  },
}

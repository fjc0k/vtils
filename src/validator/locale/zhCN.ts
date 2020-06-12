import { yup } from '../yup'

export const zhCN: yup.LocaleObjectRequired = {
  mixed: {
    default: '${path} 错误',
    required: '${path} 必填',
    oneOf: '${path} 必须是下列值之一: ${values}',
    notOneOf: '${path} 必须不是下列值之一: ${values}',
    notType: ({ path, type, value, originalValue }) => {
      const isCast = originalValue != null && originalValue !== value
      const msg = [
        `${path} 必须是一个 \`${type}\` 类型的值，`,
        `但传入的值经转换后是: \`${yup._printValue(value, true)}\``,
        !isCast
          ? '。'
          : ` (传入的原始值是 \`${yup._printValue(originalValue, true)}\`)。`,
        value !== null
          ? ''
          : '\n若用 `null` 表示空值，务必将模式标记为 `.nullable()`。',
      ]
        .filter(Boolean)
        .join('')
      return msg
    },
    defined: '${path} 必须已定义',
  },
  string: {
    length: '${path} 必须仅包含 ${length} 位字符',
    min: '${path} 必须至少包含 ${min} 位字符',
    max: '${path} 必须最多包含 ${max} 位字符',
    matches: '${path} 必须匹配该正则表达式: ${regex}',
    email: '${path} 必须是一个合法的邮箱',
    url: '${path} 必须是一个合法的链接',
    trim: '${path} 必须是一个没有旁白的字符串',
    lowercase: '${path} 必须是一个小写的字符串',
    uppercase: '${path} 必须是一个大写的字符串',
    chineseMobilePhoneNumber: '${path} 必须是一个合法的手机号码',
    chineseIDCardNumber: '${path} 必须是一个合法的身份证号码',
  },
  number: {
    min: '${path} 必须大于或等于 ${min}',
    max: '${path} 必须小于或等于 ${max}',
    lessThan: '${path} 必须小于 ${less}',
    moreThan: '${path} 必须大于 ${more}',
    positive: '${path} 必须是一个正数',
    negative: '${path} 必须是一个负数',
    integer: '${path} 必须是一个整数',
  },
  date: {
    min: '${path} 必须晚于 ${min}',
    max: '${path} 必须早于 ${max}',
  },
  boolean: {},
  object: {
    noUnknown: '${path} 上有未定义的键: ${unknown}',
  },
  array: {
    min: '${path} 必须至少包含 ${min} 个元素',
    max: '${path} 必须最多包含 ${max} 个元素',
  },
}

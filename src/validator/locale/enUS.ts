/* istanbul ignore file */
import { yup } from '../yup.js'

// ref: https://github.com/jquense/yup/blob/master/src/locale.js

export const enUS: yup.Locale = {
  mixed: {
    default: '${path} is invalid',
    required: '${path} is a required field',
    oneOf: '${path} must be one of the following values: ${values}',
    notOneOf: '${path} must not be one of the following values: ${values}',
    defined: '${path} must be defined',
    notType: ({ path, type, value, originalValue }) => {
      const isCast = originalValue != null && originalValue !== value
      const msg = [
        `${path} must be a \`${type}\` type, `,
        `but the final value was: \`${yup.printValue(value, true)}\``,
        !isCast
          ? '.'
          : ` (cast from the value \`${yup.printValue(
              originalValue,
              true,
            )}\`).`,
        value !== null
          ? ''
          : '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`',
      ]
        .filter(Boolean)
        .join('')
      return msg
    },
  },
  string: {
    length: '${path} must be exactly ${length} characters',
    min: '${path} must be at least ${min} characters',
    max: '${path} must be at most ${max} characters',
    matches: '${path} must match the following: "${regex}"',
    email: '${path} must be a valid email',
    url: '${path} must be a valid URL',
    trim: '${path} must be a trimmed string',
    lowercase: '${path} must be a lowercase string',
    uppercase: '${path} must be a upper case string',
    chineseIDCardNumber: '${path} must be a Chinese identity card number',
    chineseMobilePhoneNumber: '${path} must be a Chinese mobile phone number',
  },
  number: {
    min: '${path} must be greater than or equal to ${min}',
    max: '${path} must be less than or equal to ${max}',
    lessThan: '${path} must be less than ${less}',
    moreThan: '${path} must be greater than ${more}',
    positive: '${path} must be a positive number',
    negative: '${path} must be a negative number',
    integer: '${path} must be an integer',
    id: '${path} must be a positive integer',
    positiveInteger: '${path} must be a positive integer',
    negativeInteger: '${path} must be a negative integer',
    nonPositive: '${path} must be a non-positive number',
    nonNegative: '${path} must be a non-negative number',
    nonPositiveInteger: '${path} must be a non-positive integer',
    nonNegativeInteger: '${path} must be a non-negative integer',
  },
  date: {
    min: '${path} field must be later than ${min}',
    max: '${path} field must be at earlier than ${max}',
  },
  boolean: {},
  object: {
    noUnknown: '${path} field has unspecified keys: ${unknown}',
  },
  array: {
    min: '${path} field must have at least ${min} items',
    max: '${path} field must have less than or equal to ${max} items',
  },
}

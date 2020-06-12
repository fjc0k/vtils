import { yup } from '../yup'

// ref: https://github.com/jquense/yup/blob/master/src/locale.js
export const enUS: yup.LocaleObjectRequired = {
  mixed: {
    default: '${path} is invalid',
    required: '${path} is a required field',
    oneOf: '${path} must be one of the following values: ${values}',
    notOneOf: '${path} must not be one of the following values: ${values}',
    defined: '${path} must be defined',
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

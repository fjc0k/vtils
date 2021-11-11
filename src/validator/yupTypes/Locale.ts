export type LocaleValueFnParams<TExtra extends {} = {}> = {
  path: string
  type: string
  label?: string
  value: any
  originalValue: any
} & TExtra

export type LocaleValueFn<TExtra extends {} = {}> = (
  params: LocaleValueFnParams<TExtra>,
) => string

export type LocaleValue<TExtra extends {} = {}> = string | LocaleValueFn<TExtra>

export interface MixedLocale {
  default: LocaleValue
  required: LocaleValue
  oneOf: LocaleValue<{ values: string }>
  notOneOf: LocaleValue<{ values: string }>
  notType: LocaleValue
  defined: LocaleValue
}

export interface StringLocale {
  length: LocaleValue<{ length: number }>
  min: LocaleValue<{ min: number }>
  max: LocaleValue<{ max: number }>
  matches: LocaleValue<{ regex: RegExp }>
  email: LocaleValue<{ regex: RegExp }>
  url: LocaleValue<{ regex: RegExp }>
  trim: LocaleValue
  lowercase: LocaleValue
  uppercase: LocaleValue
  chineseMobilePhoneNumber: LocaleValue
  chineseIDCardNumber: LocaleValue
}

export interface NumberLocale {
  min: LocaleValue<{ min: number }>
  max: LocaleValue<{ max: number }>
  lessThan: LocaleValue<{ less: number }>
  moreThan: LocaleValue<{ more: number }>
  positive: LocaleValue<{ more: number }>
  negative: LocaleValue<{ less: number }>
  integer: LocaleValue
  id: LocaleValue
  positiveInteger: LocaleValue
  negativeInteger: LocaleValue
  nonpositiveInteger: LocaleValue
  nonnegativeInteger: LocaleValue
}

export interface DateLocale {
  min: LocaleValue<{ min: Date | string }>
  max: LocaleValue<{ max: Date | string }>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BooleanLocale {}

export interface ObjectLocale {
  noUnknown: LocaleValue<{ unknown: string }>
}

export interface ArrayLocale {
  min: LocaleValue<{ min: number }>
  max: LocaleValue<{ max: number }>
}

export interface Locale {
  mixed: MixedLocale
  string: StringLocale
  number: NumberLocale
  date: DateLocale
  boolean: BooleanLocale
  object: ObjectLocale
  array: ArrayLocale
}

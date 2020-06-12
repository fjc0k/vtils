import './yupTypes'
import * as yup from 'yup/es'
import locale from 'yup/es/locale'
import printValue from 'yup/es/util/printValue'
import {
  isChineseIDCardNumber,
  isPossibleChineseMobilePhoneNumber,
} from '../utils'
import { RequiredDeep } from '../types'
import { zhCN } from './locale/zhCN'

// 添加 getLocale 方法
declare module 'yup/es' {
  export interface LocaleObjectRequired extends RequiredDeep<LocaleObject> {}
  export function getLocale(): LocaleObjectRequired
}
Object.defineProperty(yup, 'getLocale', {
  value: () => locale,
})

// 添加 _printValue 方法
declare module 'yup/es' {
  export const _printValue: typeof printValue
}
Object.defineProperty(yup, '_printValue', {
  value: printValue,
})

// 添加额外的验证器
enum ExtraMethod {
  chineseMobilePhoneNumber = 'chineseMobilePhoneNumber',
  chineseIDCardNumber = 'chineseIDCardNumber',
}
declare module 'yup/es' {
  interface StringLocale {
    [ExtraMethod.chineseMobilePhoneNumber]?: TestOptionsMessage
    [ExtraMethod.chineseIDCardNumber]?: TestOptionsMessage
  }

  interface StringSchema<
    T extends string | null | undefined = string | undefined
  > extends Schema<T> {
    [ExtraMethod.chineseMobilePhoneNumber](
      message?: StringLocale[ExtraMethod.chineseMobilePhoneNumber],
    ): StringSchema<T>
    [ExtraMethod.chineseIDCardNumber](
      message?: StringLocale[ExtraMethod.chineseIDCardNumber],
    ): StringSchema<T>
  }
}
yup.addMethod(yup.string, ExtraMethod.chineseMobilePhoneNumber, function (
  this: yup.MixedSchema<any>,
  message: yup.TestOptionsMessage = yup.getLocale().string[
    ExtraMethod.chineseMobilePhoneNumber
  ],
) {
  return this.test(
    ExtraMethod.chineseMobilePhoneNumber,
    message,
    isPossibleChineseMobilePhoneNumber,
  )
})
yup.addMethod(yup.string, ExtraMethod.chineseIDCardNumber, function (
  this: yup.MixedSchema<any>,
  message: yup.TestOptionsMessage = yup.getLocale().string[
    ExtraMethod.chineseIDCardNumber
  ],
) {
  return this.test(
    ExtraMethod.chineseIDCardNumber,
    message,
    isChineseIDCardNumber,
  )
})

// 设置中文为默认语言
yup.setLocale(zhCN)

export { yup }

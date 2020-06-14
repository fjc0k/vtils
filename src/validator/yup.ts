import './yupTypes'
import * as yup from 'yup/es'
import {
  isChineseIDCardNumber,
  isPossibleChineseMobilePhoneNumber,
} from '../utils'
import { zhCN } from './locale/zhCN'

// @ts-ignore
import locale from 'yup/es/locale'

// @ts-ignore
import printValue from 'yup/es/util/printValue'

// 实现 getLocale 方法
Object.defineProperty(yup, 'getLocale', {
  value: () => locale,
})

// 实现 printValue 方法
Object.defineProperty(yup, 'printValue', {
  value: printValue,
})

// 实现 chineseMobilePhoneNumber 验证器
yup.addMethod(yup.string, 'chineseMobilePhoneNumber', function (
  message: yup.LocaleValue = yup.getLocale().string.chineseMobilePhoneNumber,
) {
  return this.test(
    'chineseMobilePhoneNumber',
    message,
    isPossibleChineseMobilePhoneNumber,
  )
})

// 实现 chineseIDCardNumber 验证器
yup.addMethod(yup.string, 'chineseIDCardNumber', function (
  message: yup.LocaleValue = yup.getLocale().string.chineseIDCardNumber,
) {
  return this.test('chineseIDCardNumber', message, isChineseIDCardNumber)
})

// 设置中文为默认语言
yup.setLocale(zhCN)

export { yup }

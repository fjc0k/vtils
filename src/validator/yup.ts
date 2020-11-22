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
yup.addMethod(
  yup.string,
  'chineseMobilePhoneNumber',
  function (message: yup.LocaleValue = locale.string.chineseMobilePhoneNumber) {
    return this.test(
      'chineseMobilePhoneNumber',
      message,
      isPossibleChineseMobilePhoneNumber,
    )
  },
)

// 实现 chineseIDCardNumber 验证器
yup.addMethod(
  yup.string,
  'chineseIDCardNumber',
  function (message: yup.LocaleValue = locale.string.chineseIDCardNumber) {
    return this.test('chineseIDCardNumber', message, isChineseIDCardNumber)
  },
)

// 实现 validateInOrder 方法
yup.addMethod(
  yup.object,
  'validateInOrder',
  function (data: any, options: any) {
    return Object.keys(data)
      .reduce((prev, key) => {
        return prev.then(() => {
          let schema: yup.MixedSchema | undefined
          try {
            schema = yup.reach(this as any, key)
          } catch (e) {}
          return schema ? this.validateAt(key, data, options) : undefined
        })
      }, Promise.resolve())
      .then(() => this.cast(data)) as any
  },
)

// 实现 validateInOrderSync 方法
yup.addMethod(
  yup.object,
  'validateInOrderSync',
  function (data: any, options: any) {
    for (const key of Object.keys(data)) {
      let schema: yup.MixedSchema | undefined
      try {
        schema = yup.reach(this as any, key)
      } catch (e) {}
      if (schema) {
        this.validateSyncAt(key, data, options)
      }
    }
    return this.cast(data)
  },
)

// 实现 validatePlus 方法
yup.addMethod(yup.mixed, 'validatePlus', function (data: any, options: any) {
  return (this.type === 'object'
    ? (this as yup.ObjectSchema).validateInOrder(data, options)
    : this.validate(data, options)
  )
    .then(data => ({ data }))
    .catch(error => ({ error, data })) as any
})

// 实现 validatePlusSync 方法
yup.addMethod(
  yup.mixed,
  'validatePlusSync',
  function (data: any, options: any) {
    try {
      const _data =
        this.type === 'object'
          ? (this as yup.ObjectSchema).validateInOrderSync(data, options)
          : this.validateSync(data, options)
      return { data: _data } as any
    } catch (error) {
      return { error, data } as any
    }
  },
)

// 设置中文为默认语言
yup.setLocale(zhCN)

export { yup }

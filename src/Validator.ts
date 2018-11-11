import castArray from './castArray'
import isArray from './isArray'
import isChineseIDCardNumber from './isChineseIDCardNumber'
import isChinesePhoneNumber from './isChinesePhoneNumber'
import isEmail from './isEmail'
import isFunction from './isFunction'
import isInteger from './isInteger'
import isNil from './isNil'
import isNumber from './isNumber'
import isNumeric from './isNumeric'
import isPromise from './isPromise'
import isRegExp from './isRegExp'
import isUrl from './isUrl'

export type ValidatorRuleType = 'number' | 'integer' | 'phone' | 'mobile' | 'landline' | 'id' | 'url' | 'email'
export type ValidatorRuleTypePredicate = (value: any) => boolean
export type ValidatorRuleCustom = (
  <D extends { [key: string]: any }>(payload: {
    key: keyof D,
    value: any,
    data: D,
    rule: ValidatorRule
  }) => boolean | Promise<boolean>
)
export interface ValidatorRule {
  type?: ValidatorRuleType,
  required?: boolean,
  len?: number,
  min?: number,
  max?: number,
  message?: any,
  custom?: RegExp | ValidatorRuleCustom,
}
export interface ValidatorRules {
  [key: string]: ValidatorRule | ValidatorRule[]
}

const typeValidators: { [key in ValidatorRuleType]: ValidatorRuleTypePredicate } = {
  number: isNumeric,
  integer: value => isNumeric(value) && isInteger(+value),
  phone: isChinesePhoneNumber,
  mobile: isChinesePhoneNumber.mobile,
  landline: isChinesePhoneNumber.landline,
  id: isChineseIDCardNumber,
  url: isUrl,
  email: isEmail
}

function validate<D>(data: D, key: keyof D, rule: ValidatorRule): Promise<boolean> {
  return new Promise(resolve => {
    const value = data[key] as any
    const { required, type, len, min, max, custom } = rule

    // required
    if (required && (isNil(value) || value === '' || (isArray(value) && !value.length))) {
      return resolve(false)
    }

    // type
    if (type && typeValidators[type] && !typeValidators[type](value)) {
      return resolve(false)
    }

    // min, max
    const shouldValidateMin = isNumber(min)
    const shouldValidateMax = isNumber(max)
    if (shouldValidateMin || shouldValidateMax) {
      const realValue = (
        (type === 'number' || type === 'integer') ? value
          : isArray(value) ? value.length
            : String(value).length
      )
      if ((shouldValidateMin && realValue < min) || (shouldValidateMax && realValue > max)) {
        return resolve(false)
      }
    }

    // len
    if (isNumber(len)) {
      const realValue = isArray(value) ? value.length : String(value).length
      if (len !== realValue) {
        return resolve(false)
      }
    }

    // custom
    if (custom) {
      /* istanbul ignore else */
      if (isRegExp(custom)) {
        return resolve(custom.test(value))
      } else if (isFunction(custom)) {
        const result = custom({ key, value, data, rule })
        if (isPromise(result)) {
          result.then(resolve)
        } else {
          resolve(result)
        }
      }
    }

    return resolve(true)
  })
}

export default class Validator<R extends ValidatorRules> {
  private rules: R = {} as any

  /**
   * 表单验证器。
   *
   * @param rules 验证规则
   */
  constructor(rules: R) {
    this.rules = rules
  }

  /**
   * 验证数据
   *
   * @param data 要验证的数据
   * @returns 验证结果
   */
  public validate<D extends { [key in keyof R]: any }>(data: Partial<D>): Promise<
    { valid: true } | (
      ValidatorRule & {
        valid: false,
        key: keyof D,
        value: D[keyof D]
      }
    )
  > {
    return new Promise(resolve => {
      Promise.all(Object.keys(data).map(key => {
        return new Promise((resolveItem, rejectItem) => {
          const rules = this.rules[key]
          if (!rules) {
            return resolveItem()
          }
          return Promise.all(castArray(rules).map(rule => {
              return new Promise((resolveRule, rejectRule) => {
                validate(data, key, rule).then(valid => {
                  if (valid) {
                    resolveRule()
                  } else {
                    rejectRule({
                      ...rule,
                      key,
                      value: data[key]
                    })
                  }
                })
              })
            })).then(resolveItem, rejectItem)
        })
      })).then(
        () => resolve({ valid: true }),
        result => resolve({ ...result, valid: false })
      )
    })
  }
}

import { Defined } from './enhanceType'
import { isChineseIDCardNumber, isEmail, isFunction, isInteger, isNumeric, isPossibleChineseMobilePhoneNumber, isPossibleChineseName, isPromiseLike, isRegExp, isUrl } from './is'
import { sequential } from './sequential'

export type EasyValidatorData = Record<keyof any, any>

export interface EasyValidatorRuleTestFunction<D extends EasyValidatorData> {
  /**
   * 测试函数。
   *
   * @param value 要测试的值
   * @param data 数据对象
   * @returns 返回是否测试通过
   */
  (
    value: Defined<D[keyof D]>,
    data: D,
  ): boolean | Promise<boolean>,
}

export interface EasyValidatorRule<D extends EasyValidatorData> {
  /** 要验证字段在数据对象中的键名 */
  key: keyof D,
  /** 验证类型 */
  type?: (
    'number' |
    'integer' |
    'chineseMobilePhoneNumber' |
    'chineseIdCardNumber' |
    'url' |
    'email' |
    'chineseName'
  ),
  /** 是否必填 */
  required?: boolean,
  /** 自定义测试，支持正则、同步函数、异步函数 */
  test?: (
    RegExp |
    EasyValidatorRuleTestFunction<D>
  ),
  /** 提示信息 */
  message: any,
}

export type EasyValidatorRules<D extends EasyValidatorData> = Array<EasyValidatorRule<D>>

export interface EasyValidatorValidateReturn<D extends EasyValidatorData> {
  /** 是否验证通过 */
  valid: boolean,
  /** 未验证通过的规则组成的列表 */
  unvalidRules: Array<EasyValidatorRule<D>>,
}

/**
 * 数据对象验证器。
 *
 * @template D 要验证的数据对象类型
 */
export class EasyValidator<D extends EasyValidatorData> {
  /**
   * 构造函数。
   *
   * @param rules 规律列表
   */
  constructor(private rules: EasyValidatorRules<D>) {}

  private check(rule: EasyValidatorRule<D>, data: D) {
    return new Promise<boolean>(resolve => {
      const key = rule.key
      const value = data[key]

      /* istanbul ignore if  */
      if (!(key in data)) {
        if (rule.required) {
          return resolve(false)
        }
      } else {
        if ((rule.required || rule.type || rule.test) && (value == null || value === '')) {
          return resolve(false)
        }
        if (rule.type) {
          switch (rule.type) {
            case 'number':
              if (!isNumeric(value)) return resolve(false)
              break
            case 'integer':
              if (!isNumeric(value) || !isInteger(Number(value))) return resolve(false)
              break
            case 'chineseMobilePhoneNumber':
              if (!isPossibleChineseMobilePhoneNumber(value)) return resolve(false)
              break
            case 'chineseIdCardNumber':
              if (!isChineseIDCardNumber(value)) return resolve(false)
              break
            case 'url':
              if (!isUrl(value)) return resolve(false)
              break
            case 'email':
              if (!isEmail(value)) return resolve(false)
              break
            case 'chineseName':
              if (!isPossibleChineseName(value)) return resolve(false)
              break
            /* istanbul ignore next */
            default:
              break
          }
        }
        if (rule.test) {
          if (isRegExp(rule.test)) {
            if (!rule.test.test(value)) {
              return resolve(false)
            }
          } else if (isFunction(rule.test)) {
            const result = rule.test(value, data)
            if (isPromiseLike(result)) {
              return result.then(resolve)
            }
            return resolve(result)
          }
        }
      }

      return resolve(true)
    })
  }

  /**
   * 验证数据。
   *
   * @param data 要验证的数据
   * @returns 返回验证结果
   */
  validate(data: D) {
    const unvalidKeys: Array<keyof D> = []
    const unvalidRules: Array<EasyValidatorRule<D>> = []

    return (
      sequential(
        this.rules.map(
          rule => () => {
            return new Promise(resolve => {
              if (unvalidKeys.indexOf(rule.key) === -1) {
                this.check(rule, data).then(valid => {
                  if (!valid) {
                    unvalidKeys.push(rule.key)
                    unvalidRules.push(rule)
                  }
                  resolve()
                })
              } else {
                resolve()
              }
            })
          },
        ),
      ).then<EasyValidatorValidateReturn<D>>(() => ({
        valid: unvalidRules.length === 0,
        unvalidRules: unvalidRules.slice(),
      }))
    )
  }
}

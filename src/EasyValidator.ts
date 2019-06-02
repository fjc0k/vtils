import { isChineseIDCardNumber, isEmail, isFunction, isInteger, isNumeric, isPossibleChineseMobilePhoneNumber, isPossibleChineseName, isPromiseLike, isRegExp, isUrl } from './is'
import { sequential } from './sequential'

export type EasyValidatorData = Record<keyof any, any>

export interface EasyValidatorRuleTestFunctionActions {
  /**
   * 更新提示信息。
   *
   * @param message 提示信息
   */
  updateMessage(message: any): void,
}

export interface EasyValidatorRuleTestFunction<D extends EasyValidatorData> {
  /**
   * 测试函数，除非显式返回 `false`，否则都将视为测试通过。
   *
   * @param data 数据对象
   * @param actions 操作列表
   * @returns 返回是否测试通过
   */
  (
    data: D,
    actions: EasyValidatorRuleTestFunctionActions,
  ): any,
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
  /**
   * 自定义测试，支持正则、同步函数、异步函数。
   *
   * 为函数时，除非显式返回 `false`，否则都将视为测试通过。
   */
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
 * @example
 * ```ts
 * interface Data {
 *   name: string,
 *   phoneNumber: string,
 *   pass1: string,
 *   pass2: string,
 * }
 * const ev = new EasyValidator<Data>([
 *   {
 *     key: 'name',
 *     type: 'chineseName',
 *     message: '请输入真实姓名',
 *   },
 *   {
 *     key: 'phoneNumber',
 *     type: 'chineseMobilePhoneNumber',
 *     message: '请输入正确的手机号码',
 *   },
 *   {
 *     key: 'phoneNumber',
 *     test: async ({ phoneNumber }, { updateMessage }) => {
 *       const result = await checkPhoneNumberAsync(phoneNumber)
 *       if (!result.valid) {
 *         updateMessage(result.message)
 *         return false
 *       }
 *     },
 *     message: '请输入正确的手机号码'
 *   },
 *   {
 *     key: 'pass1',
 *     test: ({ pass1 }) => pass1.length > 6,
 *     message: '密码应大于6位',
 *   },
 *   {
 *     key: 'pass2',
 *     test: ({ pass1, pass2 }) => pass2 === pass1,
 *     message: '两次密码应一致',
 *   },
 * ])
 * ev.validate({
 *   name: '方一一',
 *   phoneNumber: '18087030070',
 *   pass1: '1234567',
 *   pass2: '12345678'
 * }).then(res => {
 *   // => { valid: false, unvalidRules: [{ key: 'pass2', test: ({ pass1, pass2 }) => pass2 === pass1, message: '两次密码应一致' }] }
 * })
 * ```
 */
export class EasyValidator<D extends EasyValidatorData> {
  /**
   * 构造函数。
   *
   * @param rules 规则列表
   */
  constructor(private rules: EasyValidatorRules<D>) {}

  private check(rule: EasyValidatorRule<D>, data: D) {
    return new Promise<{ valid: boolean, message?: any }>(resolve => {
      const key = rule.key
      const value = data[key]

      /* istanbul ignore if  */
      if (!(key in data)) {
        if (rule.required) {
          return resolve({ valid: false })
        }
      } else {
        if ((rule.required || rule.type || rule.test) && (value == null || value === '')) {
          return resolve({ valid: false })
        }
        if (rule.type) {
          switch (rule.type) {
            case 'number':
              if (!isNumeric(value)) return resolve({ valid: false })
              break
            case 'integer':
              if (!isNumeric(value) || !isInteger(Number(value))) return resolve({ valid: false })
              break
            case 'chineseMobilePhoneNumber':
              if (!isPossibleChineseMobilePhoneNumber(value)) return resolve({ valid: false })
              break
            case 'chineseIdCardNumber':
              if (!isChineseIDCardNumber(value)) return resolve({ valid: false })
              break
            case 'url':
              if (!isUrl(value)) return resolve({ valid: false })
              break
            case 'email':
              if (!isEmail(value)) return resolve({ valid: false })
              break
            case 'chineseName':
              if (!isPossibleChineseName(value)) return resolve({ valid: false })
              break
            /* istanbul ignore next */
            default:
              break
          }
        }
        if (rule.test) {
          if (isRegExp(rule.test)) {
            if (!rule.test.test(value)) {
              return resolve({ valid: false })
            }
          } else if (isFunction(rule.test)) {
            let message: any
            const actions: EasyValidatorRuleTestFunctionActions = {
              updateMessage(comingMessage) {
                message = comingMessage
              },
            }
            const result = rule.test(data, actions)
            if (isPromiseLike(result)) {
              return result
                .then(
                  pass => ({ valid: pass !== false, message }),
                  message => ({ valid: false, message }),
                )
                .then(resolve)
            }
            return resolve({ valid: result !== false, message })
          }
        }
      }

      return resolve({ valid: true })
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
                this.check(rule, data).then(({ valid, message }) => {
                  if (!valid) {
                    unvalidKeys.push(rule.key)
                    unvalidRules.push(
                      message == null
                        ? rule
                        : { ...rule, message },
                    )
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

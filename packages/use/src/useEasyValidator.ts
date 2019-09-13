import {EasyValidator, EasyValidatorData, EasyValidatorRules, EasyValidatorValidateReturn} from 'vtils'
import {useRef} from 'react'

export interface UseEasyValidatorReturn<D extends EasyValidatorData> {
  /**
   * 验证数据。
   */
  validate(): Promise<EasyValidatorValidateReturn<D>>,
}

/**
 * 数据校验器。
 *
 * @param data 数据
 * @param rules 校验规则
 * @returns 返回包含验证函数的对象
 * @example
 * ```ts
 * const [name, setName] = useState('')
 * const [pass, setPass] = useState('')
 * const ev = useEasyValidator({ name, pass }, [
 *   {
 *     key: 'name',
 *     required: true,
 *     message: '姓名不能为空',
 *   },
 *   {
  *     key: 'pass',
  *     test: data => data.pass.length >= 6,
  *     message: '密码至少应为6位',
  *   },
 * ])
 * const handleRegisterClick = useCallback(() => {
 *   ev.validate().then(res => {
 *     if (res.valid) {
 *       console.log(res.data)
 *     } else {
 *       console.log(res.firstUnvalidRuleMessage)
 *     }
 *   })
 * }, [])
 * ```
 */
export function useEasyValidator<D extends EasyValidatorData>(data: D, rules: EasyValidatorRules<D>): UseEasyValidatorReturn<D> {
  const store = useRef<{
    data: D,
    easyValidator: EasyValidator<D>,
  } & UseEasyValidatorReturn<D>>({} as any)

  store.current.data = data

  if (!store.current.easyValidator) {
    store.current.easyValidator = new EasyValidator<D>(rules)
    store.current.validate = () => {
      const currentData = store.current.data
      return store.current.easyValidator.validate(currentData).then(res => {
        (res as any).data = currentData
        return res as any
      })
    }
  }

  return store.current
}

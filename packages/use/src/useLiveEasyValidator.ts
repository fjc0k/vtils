import {EasyValidatorData, EasyValidatorRules, mapValues} from 'vtils'
import {useEasyValidator, UseEasyValidatorValidateResult} from './useEasyValidator'
import {useEffect, useState} from 'react'

/**
 * 实时数据校验器。
 *
 * @param data 数据
 * @param rules 校验规则
 * @returns 返回包含验证函数的对象
 * @example
 * ```ts
 * const [name, setName] = useState('')
 * const [pass, setPass] = useState('')
 * const evResult = useLiveEasyValidator({ name, pass }, [
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
 * const button = (
 *   <Button disabled={!evResult.valid}>
 *     提交
 *   </Button>
 * )
 * ```
 */
export function useLiveEasyValidator<D extends EasyValidatorData>(data: D, rules: EasyValidatorRules<D>): UseEasyValidatorValidateResult<D> {
  const easyValidator = useEasyValidator(data, rules)
  const [result, setResult] = useState<UseEasyValidatorValidateResult<D>>(() => ({
    valid: true,
    validByKey: mapValues(data, () => true) as any,
    data: data,
    messages: [],
    unvalidRules: [],
    firstUnvalidRuleMessage: undefined,
  }))

  useEffect(() => {
    easyValidator.validate().then(setResult)
  }, [JSON.stringify(data)])

  return result
}

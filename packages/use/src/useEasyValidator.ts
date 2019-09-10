import {EasyValidator, EasyValidatorData, EasyValidatorRules, EasyValidatorValidateReturn} from 'vtils'
import {useRef} from 'react'

export type UseEasyValidatorValidateResult<D extends EasyValidatorData> = EasyValidatorValidateReturn<D> & { data: D }

export interface UseEasyValidatorValidate<D extends EasyValidatorData> {
  (): Promise<UseEasyValidatorValidateResult<D>>,
}

export interface UseEasyValidatorReturn<D extends EasyValidatorData> {
  validate: UseEasyValidatorValidate<D>,
}

/**
 * 数据校验器。
 *
 * @param data 数据
 * @param rules 校验规则
 * @returns 返回包含验证函数的对象
 */
export function useEasyValidator<D extends EasyValidatorData>(data: D, rules: EasyValidatorRules<D>): UseEasyValidatorReturn<D> {
  const store = useRef<{
    data: D,
    easyValidator: EasyValidator<D>,
    validate: UseEasyValidatorValidate<D>,
  }>({} as any)

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

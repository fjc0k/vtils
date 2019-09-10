import {EasyValidatorData, EasyValidatorRules, values} from 'vtils'
import {useEasyValidator, UseEasyValidatorValidateResult} from './useEasyValidator'
import {useEffect, useState} from 'react'

export function useLiveEasyValidator<D extends EasyValidatorData>(data: D, rules: EasyValidatorRules<D>) {
  const easyValidator = useEasyValidator(data, rules)
  const [result, setResult] = useState<UseEasyValidatorValidateResult<D>>()

  useEffect(() => {
    easyValidator.validate().then(setResult)
  }, values(data))

  return result
}

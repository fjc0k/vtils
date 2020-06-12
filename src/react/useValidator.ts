import { yup as _yup } from '../validator'
import { AnyObject } from '../types'
import { DependencyList, useMemo } from 'react'

export type UseValidatorSchema<T> = (
  yup: typeof _yup,
) => T extends string
  ? _yup.StringSchema
  : T extends number
  ? _yup.NumberSchema
  : T extends boolean
  ? _yup.BooleanSchema
  : T extends Array<infer X>
  ? _yup.ArraySchema<X>
  : T extends AnyObject
  ? _yup.ObjectSchema
  : _yup.MixedSchema

export interface UseValidatorResult<T> {
  data: T
  valid: boolean
  error?: _yup.ValidationError
}

export function useValidator<T>(
  data: T,
  schema: UseValidatorSchema<T>,
  schemaDeps: DependencyList = [],
): UseValidatorResult<T> {
  const yupSchema = useMemo(() => schema(_yup), schemaDeps)
  const result = useMemo((): UseValidatorResult<T> => {
    try {
      yupSchema.validateSync(data)
      return {
        data: data,
        valid: true,
      }
    } catch (error) {
      return {
        data: data,
        valid: false,
        error: error,
      }
    }
  }, [JSON.stringify(data), yupSchema])
  return result
}

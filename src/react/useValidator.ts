import { yup as _yup } from '../validator'
import { AnyObject } from '../types'
import { DependencyList, useMemo } from 'react'

const validateOptions: _yup.SchemaValidateOptions = {
  strict: true,
  abortEarly: true,
  stripUnknown: false,
  recursive: true,
}

export type UseValidatorSchema<T> = (
  yup: typeof _yup,
) => T extends string
  ? _yup.StringSchema<T>
  : T extends number
  ? _yup.NumberSchema<T>
  : T extends boolean
  ? _yup.BooleanSchema<T>
  : T extends Array<infer X>
  ? _yup.ArraySchema<X>
  : T extends AnyObject
  ? _yup.ObjectSchema<T> | _yup.GetObjectSchema<T>
  : _yup.MixedSchema<T>

export interface UseValidatorResult<T> {
  data: T
  valid: boolean
  error?: _yup.ValidationError
}

export function useValidator<T>(
  data: T,
  dataDeps: DependencyList,
  schema: UseValidatorSchema<T>,
  schemaDeps?: DependencyList,
): UseValidatorResult<T>

export function useValidator<T>(
  data: T,
  schema: UseValidatorSchema<T>,
  schemaDeps?: DependencyList,
): UseValidatorResult<T>

export function useValidator<T>(
  data: T,
  dataDeps: any,
  schema?: any,
  schemaDeps?: any,
): UseValidatorResult<T> {
  let _dataDeps: DependencyList
  let _schema: UseValidatorSchema<T>
  let _schemaDeps: DependencyList
  if (Array.isArray(dataDeps)) {
    _dataDeps = dataDeps
    _schema = schema
    _schemaDeps = schemaDeps || []
  } else {
    _dataDeps = []
    _schema = dataDeps
    _schemaDeps = schema || []
  }

  const yupSchema = useMemo((): _yup.MixedSchema => {
    const schemaOrObjectDefinitions = _schema(_yup)
    if (schemaOrObjectDefinitions.__isYupSchema__) {
      return schemaOrObjectDefinitions as any
    }
    return _yup.object(schemaOrObjectDefinitions as any)
  }, _schemaDeps)
  const result = useMemo((): UseValidatorResult<T> => {
    try {
      // yup 不能保证验证顺序，但通常顺序又是很重要的，因此对于 object 特殊处理
      if (yupSchema.type === 'object') {
        ;(yupSchema as _yup.ObjectSchema).validateInOrderSync(data)
      } else {
        yupSchema.validateSync(data, validateOptions)
      }
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
  }, [..._dataDeps, yupSchema])
  return result
}

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
  error?: _yup.ValidationError | undefined
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
    const r = yupSchema.validatePlusSync(data, validateOptions)
    return {
      data: r.data,
      valid: !r.error,
      error: r.error,
    }
  }, [..._dataDeps, yupSchema])
  return result
}

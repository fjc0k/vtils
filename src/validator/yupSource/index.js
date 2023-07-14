import Lazy from './Lazy'
import Ref from './Reference'
import ValidationError from './ValidationError'
import array from './array'
import bool from './boolean'
import date from './date'
import getLocale from './getLocale'
import mixed from './mixed'
import number from './number'
import object from './object'
import setLocale from './setLocale'
import string from './string'
import isSchema from './util/isSchema'
import printValue from './util/printValue'
import reach from './util/reach'

let boolean = bool
let ref = (key, options) => new Ref(key, options)

let lazy = fn => new Lazy(fn)

function addMethod(schemaType, name, fn) {
  if (!schemaType || !isSchema(schemaType.prototype))
    throw new TypeError('You must provide a yup schema constructor function')

  if (typeof name !== 'string')
    throw new TypeError('A Method name must be provided')
  if (typeof fn !== 'function')
    throw new TypeError('Method function must be provided')

  schemaType.prototype[name] = fn
}

export {
  mixed,
  string,
  number,
  bool,
  boolean,
  date,
  object,
  array,
  ref,
  lazy,
  reach,
  isSchema,
  addMethod,
  setLocale,
  getLocale,
  printValue,
  ValidationError,
}

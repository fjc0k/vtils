import { number as locale } from './locale'
import MixedSchema from './mixed'
import inherits from './util/inherits'
import isAbsent from './util/isAbsent'

let isNaN = value => value != +value

export default function NumberSchema(payload) {
  if (!(this instanceof NumberSchema))
    return typeof payload === 'function'
      ? payload(new NumberSchema())
      : new NumberSchema()

  MixedSchema.call(this, { type: 'number' })

  this.withMutation(() => {
    this.transform(function (value) {
      let parsed = value

      if (this._allowEmptyString && parsed === '') {
        parsed = ''
      } else {
        if (typeof parsed === 'string') {
          parsed = parsed.replace(/\s/g, '')
          if (parsed === '') return NaN
          // don't use parseFloat to avoid positives on alpha-numeric strings
          parsed = +parsed
        }
      }

      if (this.isType(parsed)) return parsed

      return parseFloat(parsed)
    })
  })
}

inherits(NumberSchema, MixedSchema, {
  _typeCheck(value) {
    if (value instanceof Number) value = value.valueOf()

    return typeof value === 'number' && !isNaN(value)
  },

  min(min, message = locale.min) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value) {
        return isAbsent(value) || value >= this.resolve(min)
      },
    })
  },

  max(max, message = locale.max) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value) {
        return isAbsent(value) || value <= this.resolve(max)
      },
    })
  },

  lessThan(less, message = locale.lessThan) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: { less },
      test(value) {
        return isAbsent(value) || value < this.resolve(less)
      },
    })
  },

  moreThan(more, message = locale.moreThan) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: { more },
      test(value) {
        return isAbsent(value) || value > this.resolve(more)
      },
    })
  },

  positive(msg = locale.positive) {
    return this.moreThan(0, msg)
  },

  negative(msg = locale.negative) {
    return this.lessThan(0, msg)
  },

  integer(message = locale.integer) {
    return this.test({
      name: 'integer',
      message,
      test: val => isAbsent(val) || Number.isInteger(val),
    })
  },

  id(msg = locale.id) {
    return this.positive(msg).integer(msg)
  },

  positiveInteger(msg = locale.positiveInteger) {
    return this.positive(msg).integer(msg)
  },

  negativeInteger(msg = locale.negativeInteger) {
    return this.negative(msg).integer(msg)
  },

  nonPositive(msg = locale.nonPositive) {
    return this.test({
      name: 'nonPositive',
      message: msg,
      exclusive: true,
      test: val => isAbsent(val) || val <= 0,
    })
  },

  nonNegative(msg = locale.nonNegative) {
    return this.test({
      name: 'nonNegative',
      message: msg,
      exclusive: true,
      test: val => isAbsent(val) || val >= 0,
    })
  },

  nonPositiveInteger(msg = locale.nonPositiveInteger) {
    return this.test({
      name: 'nonPositiveInteger',
      message: msg,
      exclusive: true,
      test: val => isAbsent(val) || (Number.isInteger(val) && val <= 0),
    })
  },

  nonNegativeInteger(msg = locale.nonNegativeInteger) {
    return this.test({
      name: 'nonNegativeInteger',
      message: msg,
      exclusive: true,
      test: val => isAbsent(val) || (Number.isInteger(val) && val >= 0),
    })
  },

  truncate() {
    return this.transform(value => (!isAbsent(value) ? value | 0 : value))
  },

  round(method) {
    var avail = ['ceil', 'floor', 'round', 'trunc']
    method = (method && method.toLowerCase()) || 'round'

    // this exists for symemtry with the new Math.trunc
    if (method === 'trunc') return this.truncate()

    if (avail.indexOf(method.toLowerCase()) === -1)
      throw new TypeError(
        'Only valid options for round() are: ' + avail.join(', '),
      )

    return this.transform(value =>
      !isAbsent(value) ? Math[method](value) : value,
    )
  },
})

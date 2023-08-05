export type VaeLocaleMessage = string

export class VaeLocale {
  static base = {
    required: 'required',
  }

  static string = {
    type: 's type',
    min: 's min',
    max: 's max',
    length: 's len',
    email: 's email',
    url: 's url',
    regex: 's regex',
    includes: 's includes',
    startsWith: 's startsWith',
    endsWith: 's endsWith',
    chinesePhoneNumber: 's chinesePhoneNumber',
    chineseIDCardNumber: 's chineseIDCardNumber',
  }

  static object = {
    type: 'obj type',
  }

  static number = {
    type: 'n type',
    min: 'n min',
    max: 'n max',
    lessThan: '',
    moreThan: '',
    integer: '',
    positive: '',
    nonpositive: '',
    negative: '',
    nonnegative: '',
    positiveInteger: '',
    id: '',
  }

  static boolean = {
    type: 'bool type',
  }

  static array = {
    type: 'array type',
    min: 'arr min',
    max: 'arr max',
    length: 'arr length',
  }

  static enum = {
    type: 'enum type',
  }

  static date = {
    type: 'date type',
    min: 'date min',
    max: 'date max',
  }
}

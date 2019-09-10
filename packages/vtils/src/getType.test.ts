import {getType, GetTypeReturn} from './getType'
import {jestExpectEqual} from './enhanceJest'

const valueToType: Array<[any, GetTypeReturn]> = [
  [1, 'Number'],
  ['2', 'String'],
  [/x/, 'RegExp'],
  [{}, 'Object'],
  [[], 'Array'],
  [false, 'Boolean'],
  [null, 'Null'],
  [undefined, 'Undefined'],
  [(function () { return arguments })(), 'Arguments'],
  [() => {}, 'Function'],
  [new Error('hello'), 'Error'],
  [Symbol(1), 'Symbol'],
  [new Map(), 'Map'],
  [new Set(), 'Set'],
  [new WeakMap(), 'WeakMap'],
  [new WeakSet(), 'WeakSet'],
]

test('类型检测正确', () => {
  valueToType.forEach(([value, type]) => {
    jestExpectEqual(getType(value), type)
  })
})

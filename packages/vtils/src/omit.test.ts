import {jestExpectEqual} from './enhanceJest'
import {omit} from './omit'

test('表现正常', () => {
  const sym = Symbol()
  const obj = {
    id: 1,
    name: 'Jay',
    age: 20,
    2: 0, // 数字键属性
    [sym]: [], // 不可枚举属性
  }

  jestExpectEqual(
    omit(obj, ['age', 2]),
    {
      id: 1,
      name: 'Jay',
    },
  )
})

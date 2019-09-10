import {jestExpectEqual} from './enhanceJest'
import {pick} from './pick'

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
    pick(obj, ['age', 2]),
    {
      age: 20,
      2: 0,
    },
  )
})

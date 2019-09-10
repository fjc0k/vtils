import {jestExpectEqual} from './enhanceJest'
import {mapValues} from './mapValues'

test('表现正常', () => {
  const obj = {
    id: 1,
    name: 'Jay',
    age: 22,
    [Symbol()]: [], // 不可枚举属性
  }

  jestExpectEqual(
    mapValues(obj, value => typeof value === 'number' ? value + 1 : `${value}.`),
    {
      id: 2,
      name: 'Jay.',
      age: 23,
    },
  )
})

import { jestExpectEqual } from './enhanceJest'
import { keyBy } from './keyBy'

test('表现正常', () => {
  const list = [
    { id: 1, name: 'Jay', age: 20 },
    { id: 2, name: 'Alan', age: 20 },
    { id: 3, name: 'Ming', age: 21 },
  ]

  jestExpectEqual(
    keyBy(list, item => item.id),
    {
      1: list[0],
      2: list[1],
      3: list[2],
    },
  )

  jestExpectEqual(
    keyBy(list, item => item.age),
    {
      20: list[1],
      21: list[2],
    },
  )
})

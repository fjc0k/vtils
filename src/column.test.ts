import { column } from './column'
import { jestExpectEqual } from './enhanceJest'

const list = [
  { id: 1, name: 'Jay' },
  { id: 2, name: 'Alan' },
  { id: 3, name: 'Ming' },
]

test('返回数组正常', () => {
  jestExpectEqual(
    column(list, 'id'),
    [1, 2, 3],
  )
})

test('返回对象正常', () => {
  jestExpectEqual(
    column(list, 'name', 'id'),
    {
      1: 'Jay',
      2: 'Alan',
      3: 'Ming',
    },
  )
})

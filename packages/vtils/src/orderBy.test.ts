import {jestExpectEqual} from './enhanceJest'
import {orderBy, OrderByRuleType} from './orderBy'

const strData = ['hello', 'fjc', '20', '花间一壶酒', '=']

const numData = [-5, 4, 0, 1.2, 20]

const arrData = [
  {a: 'x', b: 3},
  {a: 'y', b: 4},
  {a: 'x', b: 1},
  {a: 'z', b: 1},
  {a: 'y', b: 2},
]

test('desc 正常', () => {
  jestExpectEqual(
    orderBy(strData, {
      iteratee: item => item.length,
      type: OrderByRuleType.desc,
    }),
    ['hello', '花间一壶酒', 'fjc', '20', '='],
  )

  jestExpectEqual(
    orderBy(numData, {
      iteratee: item => item,
      type: OrderByRuleType.desc,
    }),
    [20, 4, 1.2, 0, -5],
  )

  jestExpectEqual(
    orderBy(arrData, {
      iteratee: item => item.b,
      type: OrderByRuleType.desc,
    }),
    [
      {a: 'y', b: 4},
      {a: 'x', b: 3},
      {a: 'y', b: 2},
      {a: 'x', b: 1},
      {a: 'z', b: 1},
    ],
  )
})

test('asc 正常', () => {
  jestExpectEqual(
    orderBy(strData, {
      iteratee: item => item.length,
      type: OrderByRuleType.asc,
    }),
    ['=', '20', 'fjc', 'hello', '花间一壶酒'],
  )

  jestExpectEqual(
    orderBy(numData, {
      iteratee: item => item,
      type: OrderByRuleType.asc,
    }),
    [-5, 0, 1.2, 4, 20],
  )

  jestExpectEqual(
    orderBy(arrData, {
      iteratee: item => item.b,
      type: OrderByRuleType.asc,
    }),
    [
      {a: 'x', b: 1},
      {a: 'z', b: 1},
      {a: 'y', b: 2},
      {a: 'x', b: 3},
      {a: 'y', b: 4},
    ],
  )
})

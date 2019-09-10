import {jestExpectEqual} from './enhanceJest'
import {sum, sumBy} from './sum'

test('sum', () => {
  jestExpectEqual(
    sum(1, 2, [3, 4], 5, [6]),
    21,
  )
})

test('sumBy', () => {
  jestExpectEqual(
    sumBy(
      [
        {num: 1},
        {num: 2},
        {num: 3},
      ],
      item => item.num,
    ),
    6,
  )
})

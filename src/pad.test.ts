import {jestExpectEqual} from './enhanceJest'
import {padEnd, padStart} from './pad'

test('padStart', () => {
  [-3.4, -1, 0, 1.2, 5.6].forEach(length => {
    expect(() => padStart('x', length)).toThrowError(
      new RangeError('length 应为正整数'),
    )
  })

  jestExpectEqual(
    padStart('x', 3),
    '  x',
  )

  jestExpectEqual(
    padStart('x', 3, '=-'),
    '=-x',
  )

  jestExpectEqual(
    padStart('x', 4, '=-'),
    '=-=x',
  )

  jestExpectEqual(
    padStart('5', 4, '0'),
    '0005',
  )
})

test('padEnd', () => {
  [-3.4, -1, 0, 1.2, 5.6].forEach(length => {
    expect(() => padEnd('x', length)).toThrowError(
      new RangeError('length 应为正整数'),
    )
  })

  jestExpectEqual(
    padEnd('x', 3),
    'x  ',
  )

  jestExpectEqual(
    padEnd('x', 3, '=-'),
    'x=-',
  )

  jestExpectEqual(
    padEnd('x', 4, '=-'),
    'x=-=',
  )

  jestExpectEqual(
    padEnd('5', 4, '0'),
    '5000',
  )
})

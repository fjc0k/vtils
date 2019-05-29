import { jestExpectEqual } from './enhanceJest'
import { parseCSSValue } from './parseCSSValue'

test('数字正常', () => {
  jestExpectEqual(
    parseCSSValue(20),
    {
      value: 20,
      unit: 'px',
    },
  )

  jestExpectEqual(
    parseCSSValue(-1, 'em'),
    {
      value: -1,
      unit: 'em',
    },
  )
})

test('字符串正常', () => {
  jestExpectEqual(
    parseCSSValue('20'),
    {
      value: 20,
      unit: 'px',
    },
  )

  jestExpectEqual(
    parseCSSValue('1', 'em'),
    {
      value: 1,
      unit: 'em',
    },
  )

  jestExpectEqual(
    parseCSSValue('5px', 'em'),
    {
      value: 5,
      unit: 'px',
    },
  )

  jestExpectEqual(
    parseCSSValue('-5px'),
    {
      value: -5,
      unit: 'px',
    },
  )

  jestExpectEqual(
    parseCSSValue('5.2rem'),
    {
      value: 5.2,
      unit: 'rem',
    },
  )

  jestExpectEqual(
    parseCSSValue('50%'),
    {
      value: 50,
      unit: '%',
    },
  )
})

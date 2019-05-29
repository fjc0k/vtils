import { jestExpectEqual } from './enhanceJest'
import { startsWith } from './startsWith'

test('needle 为空字符串时返回 true', () => {
  jestExpectEqual(
    startsWith('', ''),
    true,
  )
  jestExpectEqual(
    startsWith('333', ''),
    true,
  )
  jestExpectEqual(
    startsWith(',', ''),
    true,
  )
  jestExpectEqual(
    startsWith('我们', ''),
    true,
  )
})

test('表现正常', () => {
  jestExpectEqual(
    startsWith('点的', '点'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '3'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '33'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '333'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '3333'),
    false,
  )
  jestExpectEqual(
    startsWith(',', ','),
    true,
  )
  jestExpectEqual(
    startsWith('我们', '我们'),
    true,
  )
  jestExpectEqual(
    startsWith('我们', '们'),
    false,
  )
})

test('无原生 startsWith 时表现正常', () => {
  String.prototype.startsWith = null as any

  jestExpectEqual(
    startsWith('点的', '点'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '3'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '33'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '333'),
    true,
  )
  jestExpectEqual(
    startsWith('333', '3333'),
    false,
  )
  jestExpectEqual(
    startsWith(',', ','),
    true,
  )
  jestExpectEqual(
    startsWith('我们', '我们'),
    true,
  )
  jestExpectEqual(
    startsWith('我们', '们'),
    false,
  )
})

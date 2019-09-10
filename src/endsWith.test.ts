import {endsWith} from './endsWith'
import {jestExpectEqual} from './enhanceJest'

test('needle 为空字符串时返回 true', () => {
  jestExpectEqual(
    endsWith('', ''),
    true,
  )
  jestExpectEqual(
    endsWith('333', ''),
    true,
  )
  jestExpectEqual(
    endsWith(',', ''),
    true,
  )
  jestExpectEqual(
    endsWith('我们', ''),
    true,
  )
})

test('表现正常', () => {
  jestExpectEqual(
    endsWith('点的', '的'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '3'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '33'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '333'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '3333'),
    false,
  )
  jestExpectEqual(
    endsWith(',', ','),
    true,
  )
  jestExpectEqual(
    endsWith('我们', '我们'),
    true,
  )
  jestExpectEqual(
    endsWith('我们', '我'),
    false,
  )
})

test('无原生 endsWith 时表现正常', () => {
  String.prototype.endsWith = null as any

  jestExpectEqual(
    endsWith('点的', '的'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '3'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '33'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '333'),
    true,
  )
  jestExpectEqual(
    endsWith('333', '3333'),
    false,
  )
  jestExpectEqual(
    endsWith(',', ','),
    true,
  )
  jestExpectEqual(
    endsWith('我们', '我们'),
    true,
  )
  jestExpectEqual(
    endsWith('我们', '我'),
    false,
  )
})

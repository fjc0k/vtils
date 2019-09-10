import {expectType, jestExpectEqual} from './enhanceJest'
import {PartialBy} from './enhanceType'
import {partialBy} from './partialBy'

test('表现正常', () => {
  const obj = {
    '1': 2,
    'eee': 'hello',
    '=+': /test/,
  } as const

  expectType<PartialBy<typeof obj, '1'>>(
    partialBy(obj, ['1']),
  )

  jestExpectEqual(
    obj,
    partialBy(obj, ['1']),
    partialBy(obj, ['1', 'eee']),
    partialBy(obj, ['1', 'eee', '=+']),
  )
})

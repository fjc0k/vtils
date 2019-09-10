import {expectType, jestExpectEqual} from './enhanceJest'
import {partial} from './partial'

test('表现正常', () => {
  const obj = {
    '1': 2,
    'eee': 'hello',
    '=+': /test/,
  } as const

  expectType<Partial<typeof obj>>(
    partial(obj),
  )

  jestExpectEqual(
    obj,
    partial(obj),
  )
})

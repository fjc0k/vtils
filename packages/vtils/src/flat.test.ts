import {flat} from './flat'
import {jestExpectEqual} from './enhanceJest'

test('表现正常', () => {
  jestExpectEqual(
    flat([
      [1, 2, '3', [/t/]],
      ['', [/x/]],
    ]),
    [1, 2, '3', [/t/], '', [/x/]],
  )
})

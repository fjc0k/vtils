import {ii} from './ii'
import {jestExpectEqual} from './enhanceJest'

test('正常', () => {
  [1, 'false', /d/, [], {}, () => {}].forEach(item => {
    jestExpectEqual(
      ii(() => item),
      item,
    )
  })
})

import { jestExpectEqual } from './enhanceJest'
import { noop } from './noop'

test('执行结果正确', () => {
  jestExpectEqual(
    noop(),
    undefined,
  )
})

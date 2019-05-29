import { jestExpectEqual } from './enhanceJest'
import { wait } from './wait'

test('表现正常', async () => {
  const start = Date.now()
  await wait(500)
  const end = Date.now()

  jestExpectEqual(
    end - start >= 500,
    true,
  )
})

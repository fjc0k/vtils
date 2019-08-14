import { jestExpectEqual } from './enhanceJest'
import { loop } from './loop'
import { wait } from './wait'

test('表现正常', async () => {
  let i = 0
  setTimeout(
    loop(500, () => i++),
    3200,
  )
  await wait(4000)
  jestExpectEqual(i, Math.floor(3200 / 500))
})

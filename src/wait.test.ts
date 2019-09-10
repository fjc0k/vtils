import {jestExpectEqual} from './enhanceJest'
import {wait} from './wait'

test('表现正常', async () => {
  const start = Date.now()
  await wait(500)
  const end = Date.now()

  jestExpectEqual(
    end - start >= 500,
    true,
  )
})

test('可取消等待', async () => {
  const cb = jest.fn()
  const w = wait(500)
  w.then(cb)
  w.cancel()
  await wait(600)

  expect(cb).toBeCalledTimes(0)
})

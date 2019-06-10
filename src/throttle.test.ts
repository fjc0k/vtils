import { throttle } from './throttle'
import { wait } from './wait'

test('表现正常', async () => {
  const fn: (x: number, y: number) => number = jest.fn().mockImplementation((x: number, y: number) => x + y)

  const throttledFn = throttle(fn, 500)

  expect(fn).toBeCalledTimes(0)

  throttledFn(1, 2)

  expect(fn).toBeCalledTimes(1)

  throttledFn(1, 2)

  expect(fn).toBeCalledTimes(1)

  await wait(400)

  expect(fn).toBeCalledTimes(1)

  await wait(200)

  expect(fn).toBeCalledTimes(2)
})

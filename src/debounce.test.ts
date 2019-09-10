import {debounce} from './debounce'
import {times} from './times'
import {wait} from './wait'

test('表现正常', async () => {
  const fn: (x: number, y: number) => number = jest.fn().mockImplementation((x: number, y: number) => x + y)

  const debouncedFn = debounce(fn, 500)

  times(10000, () => debouncedFn(1, 2))

  await wait(550)

  expect(fn).toBeCalledTimes(1)

  times(10000, () => debouncedFn(1, 2))

  await wait(550)

  expect(fn).toBeCalledTimes(2)
})

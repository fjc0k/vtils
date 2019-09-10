import {range} from './range'
import {times} from './times'

test('表现正常', () => {
  range(-1000, 1000).forEach(i => {
    const fn = jest.fn()

    times(i, fn)

    expect(fn).toBeCalledTimes(Math.max(0, i))
  })
})

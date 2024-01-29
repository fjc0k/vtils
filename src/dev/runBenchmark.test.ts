/**
 * @jest-environment node
 */

import { range, sum } from 'lodash-uni'
import { runBenchmark } from './runBenchmark.ts'

describe('runBenchmark', () => {
  test('fastest 正常', () => {
    let text = ''
    const log = jest.fn(message => {
      text = message
    })
    jest.spyOn(console, 'log').mockImplementationOnce(log)
    runBenchmark({
      ['x!fastest']: () => sum(range(1, 2)),
      ['y']: () => sum(range(1, 10000)),
    })
    expect(text)
      .toInclude('name')
      .toInclude('ops/sec')
      .toInclude('x')
      .toInclude('y')
  })

  test('fastest 错误', () => {
    expect(() =>
      runBenchmark({
        ['x']: () => sum(range(1, 2)),
        ['y!fastest']: () => sum(range(1, 10000)),
      }),
    ).toThrowError('Expect fastest is y, actual fastest is x.')
  })
})

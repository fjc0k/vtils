import { run } from './run.ts'

describe('run', () => {
  test('同步函数正常', async () => {
    expect(await run(() => 'ok')).toEqual([null, 'ok'])
    expect(
      await run(() => {
        throw 'err'
      }),
    ).toEqual(['err'])
  })

  test('异步函数正常', async () => {
    expect(await run(async () => 'ok')).toEqual([null, 'ok'])
    expect(
      await run(async () => {
        throw 'err'
      }),
    ).toEqual(['err'])
  })
})

import {jestExpectEqual} from './enhanceJest'
import {result} from './result'

test('Promise 正常', async () => {
  jestExpectEqual(
    await result(
      new Promise<number>(resolve => resolve(2)),
    ),
    [null, 2],
  )

  jestExpectEqual(
    await result(
      new Promise<number>((resolve, reject) => reject('err')),
    ),
    ['err'] as any,
  )
})

test('() => Promise 正常', async () => {
  jestExpectEqual(
    await result(
      () => new Promise<number>(resolve => resolve(2)),
    ),
    [null, 2],
  )

  jestExpectEqual(
    await result(
      () => new Promise<number>((resolve, reject) => reject('err')),
    ),
    ['err'] as any,
  )
})

test('() => !Promise 正常', async () => {
  jestExpectEqual(
    await result(
      () => 2,
    ),
    [null, 2],
  )

  jestExpectEqual(
    await result(
      () => { throw 'err' },
    ),
    ['err'] as any,
  )
})

import { Disposer } from './Disposer'

test('表现正常', async () => {
  const disposer = new Disposer()

  const dispose1 = jest.fn()
  const dispose2 = jest.fn()
  const dispose3 = jest.fn()

  disposer.add(dispose1)
  disposer.add(dispose1)
  disposer.add(dispose2, dispose3)

  await disposer.dispose()

  expect(dispose1).toBeCalledTimes(1)
  expect(dispose2).toBeCalledTimes(1)
  expect(dispose3).toBeCalledTimes(1)
})

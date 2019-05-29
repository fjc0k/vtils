import { jestExpectEqual } from './enhanceJest'
import { parallel } from './parallel'
import { wait } from './wait'

test('并行执行任务，并返回各个任务执行结果组成的数组', async () => {
  let i = 0

  const task0 = jest.fn().mockImplementation(() => i++)
  const task1 = jest.fn().mockImplementation(async () => {
    await wait(50)
    return i++
  })
  const task2 = jest.fn().mockImplementation(async () => {
    await wait(200)
    return i++
  })
  const task3 = jest.fn().mockImplementation(() => i++)
  const task4 = jest.fn().mockImplementation(async () => {
    await wait(100)
    return i++
  })

  jestExpectEqual(
    await parallel([
      task0,
      task1,
      task2,
      task3,
      task4,
    ]),
    [0, 2, 4, 1, 3],
  )
})

test('遇到报错即返回报错信息', async () => {
  const task0 = jest.fn().mockReturnValue(0)
  const task1 = jest.fn().mockImplementation(async () => {
    await wait(50)
    return Promise.reject('出错啦')
  })
  const task2 = jest.fn().mockImplementation(async () => {
    await wait(100)
    return 2
  })

  expect(
    parallel([
      task0,
      task1,
      task2,
    ]),
  ).rejects.toMatch(/出错啦/)

  await wait(300)

  expect(task0).toBeCalledTimes(1)
  expect(task1).toBeCalledTimes(1)
  expect(task2).toBeCalledTimes(1)
})

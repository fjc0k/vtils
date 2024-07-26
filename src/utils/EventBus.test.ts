import { EventBus } from './EventBus'
import { wait } from './wait'

type Events = {
  enter: () => number
  success: () => any
  error: (payload: { message: string }) => any
}

describe('EventBus', () => {
  test('可订阅发布', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn()
    bus.on('enter', enterCallback)
    bus.emit('enter')
    expect(enterCallback).toBeCalled().toBeCalledTimes(1)
  })

  test('可取消订阅', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn()
    const enterCallback2 = jest.fn()
    const enterCallback3 = jest.fn()
    bus.on('enter', enterCallback)
    const offCallback2 = bus.on('enter', enterCallback2)
    bus.on('enter', enterCallback3)
    bus.emit('enter')
    expect(enterCallback).toBeCalled().toBeCalledTimes(1)
    expect(enterCallback2).toBeCalled().toBeCalledTimes(1)
    expect(enterCallback3).toBeCalled().toBeCalledTimes(1)
    offCallback2()
    bus.emit('enter')
    expect(enterCallback).toBeCalled().toBeCalledTimes(2)
    expect(enterCallback2).toBeCalled().toBeCalledTimes(1)
    expect(enterCallback3).toBeCalled().toBeCalledTimes(2)
    bus.off('enter', enterCallback3)
    bus.emit('enter')
    expect(enterCallback).toBeCalled().toBeCalledTimes(3)
    expect(enterCallback2).toBeCalled().toBeCalledTimes(1)
    expect(enterCallback3).toBeCalled().toBeCalledTimes(2)
    bus.off('enter')
    bus.emit('enter')
    expect(enterCallback).toBeCalled().toBeCalledTimes(3)
    expect(enterCallback2).toBeCalled().toBeCalledTimes(1)
    expect(enterCallback3).toBeCalled().toBeCalledTimes(2)
  })

  test('可订阅发布多次', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn()
    const enterCallback2 = jest.fn()
    bus.on('enter', enterCallback)
    bus.on('enter', enterCallback2)
    bus.emit('enter')
    bus.emit('enter')
    bus.emit('enter')
    expect(enterCallback).toBeCalled().toBeCalledTimes(3)
    expect(enterCallback2).toBeCalled().toBeCalledTimes(3)
  })

  test('可传递参数', () => {
    const bus = new EventBus<Events>()
    const errorCallback = jest.fn()
    bus.on('error', errorCallback)
    bus.emit('error', { message: 'unexpected error' })
    expect(errorCallback).toBeCalled().toBeCalledTimes(1).toBeCalledWith({
      message: 'unexpected error',
    })
  })

  test('可只订阅一次', () => {
    const bus = new EventBus<Events>()
    const successCallback = jest.fn()
    const successCallback2 = jest.fn()
    bus.once('success', successCallback)
    bus.once('success', successCallback2)
    bus.emit('success')
    bus.emit('success')
    bus.emit('success')
    bus.emit('success')
    expect(successCallback).toBeCalled().toBeCalledTimes(1)
    expect(successCallback2).toBeCalled().toBeCalledTimes(1)
  })

  test('可只订阅一次: bug', async () => {
    const bus = new EventBus<Events>()
    const successCallback = jest.fn()
    const successCallback2 = jest.fn()
    bus.once('success', successCallback)
    bus.once('success', successCallback2)
    await wait(10)
    bus.emit('success')
    expect(successCallback).toBeCalled().toBeCalledTimes(1)
    expect(successCallback2).toBeCalled().toBeCalledTimes(1)
  })

  test('可获取订阅回调结果', () => {
    const bus = new EventBus<Events>()
    const enterCallback = jest.fn().mockImplementation(() => 1)
    const enterCallback2 = jest.fn().mockImplementation(() => 2)
    bus.on('enter', enterCallback)
    bus.on('enter', enterCallback2)
    const results = bus.emit('enter')
    expect(results).toEqual([1, 2])
  })

  test('支持 beforeOn', () => {
    const bus = new EventBus<Events>({
      beforeOn: {
        error(cb) {
          cb.__EVENT_BUS_TAG__ = 200
          return cb
        },
      },
    })
    const errorCallback = jest.fn().mockImplementation(() => 1)
    const errorCallback2 = jest.fn().mockImplementation(() => 2)
    bus.on('error', errorCallback)
    bus.on('error', errorCallback2)
    const results = bus.emit('error', { message: 'hello' })
    expect(results).toEqual([1, 2])
    expect(errorCallback).toBeCalled().toBeCalledTimes(1)
    expect(errorCallback2).toBeCalled().toBeCalledTimes(1)
    bus.off('error', 200)
    const results2 = bus.emit('error', { message: 'hello2' })
    expect(results2).toEqual([])
    expect(errorCallback).toBeCalled().toBeCalledTimes(1)
    expect(errorCallback2).toBeCalled().toBeCalledTimes(1)
  })

  test('支持 beforeEmit', () => {
    const bus = new EventBus<Events>({
      beforeEmit: {
        error() {
          this.emit({
            name: 'success',
          })
        },
      },
    })
    const errorCallback = jest.fn().mockImplementation(() => 1)
    const errorCallback2 = jest.fn().mockImplementation(() => 2)
    const successCallback = jest.fn().mockImplementation(() => 'x')
    const successCallback2 = jest.fn().mockImplementation(() => 'y')
    bus.on('error', errorCallback)
    bus.on('error', errorCallback2)
    bus.on('success', successCallback)
    bus.on('success', successCallback2)
    const results = bus.emit('error', { message: 'hello' })
    expect(results).toEqual([1, 2])
    expect(errorCallback).toBeCalled().toBeCalledTimes(1)
    expect(errorCallback2).toBeCalled().toBeCalledTimes(1)
    expect(successCallback).toBeCalled().toBeCalledTimes(1)
    expect(successCallback2).toBeCalled().toBeCalledTimes(1)
  })

  test('支持按 tag emit', () => {
    let i = 0
    const bus = new EventBus<Events>({
      beforeOn: {
        error(cb) {
          cb.__EVENT_BUS_TAG__ = i++
          return cb
        },
      },
    })
    const errorCallback = jest.fn().mockImplementation(() => 1)
    const errorCallback2 = jest.fn().mockImplementation(() => 2)
    bus.on('error', errorCallback)
    bus.on('error', errorCallback2)

    const results = bus.emit('error', { message: 'hello' })
    expect(results).toEqual([1, 2])
    expect(errorCallback).toBeCalled().toBeCalledTimes(1)
    expect(errorCallback2).toBeCalled().toBeCalledTimes(1)

    const results2 = bus.emit({ name: 'error', tag: 0 }, { message: 'hello2' })
    expect(results2).toEqual([1])
    expect(errorCallback).toBeCalled().toBeCalledTimes(2)
    expect(errorCallback2).toBeCalled().toBeCalledTimes(1)

    const results3 = bus.emit({ name: 'error', tag: 1 }, { message: 'hello3' })
    expect(results3).toEqual([2])
    expect(errorCallback).toBeCalled().toBeCalledTimes(2)
    expect(errorCallback2).toBeCalled().toBeCalledTimes(2)
  })

  test('支持 clear', () => {
    const bus = new EventBus<{
      test: () => any
    }>()
    const fn = jest.fn()
    bus.on('test', fn)
    bus.emit('test')
    expect(fn).toBeCalled().toBeCalledTimes(1)
    bus.emit('test')
    expect(fn).toBeCalled().toBeCalledTimes(2)
    bus.clear()
    bus.emit('test')
    expect(fn).toBeCalled().toBeCalledTimes(2)
  })

  test('支持 filter', () => {
    const bus = new EventBus<{
      test: () => any
    }>()
    const fn = jest.fn()
    const fn1 = jest.fn()
    const fn2 = jest.fn()

    bus.on('test', fn)
    bus.on('test', fn1)
    bus.on('test', fn2)

    bus.emit({
      name: 'test',
    })
    expect(fn).toBeCalled().toBeCalledTimes(1)
    expect(fn1).toBeCalled().toBeCalledTimes(1)
    expect(fn2).toBeCalled().toBeCalledTimes(1)

    bus.emit({
      name: 'test',
      filter: (_, index) => index === 0,
    })
    expect(fn).toBeCalled().toBeCalledTimes(2)
    expect(fn1).toBeCalled().toBeCalledTimes(1)
    expect(fn2).toBeCalled().toBeCalledTimes(1)

    bus.emit({
      name: 'test',
      filter: (_, index, { length }) => index === length - 1,
    })
    expect(fn).toBeCalled().toBeCalledTimes(2)
    expect(fn1).toBeCalled().toBeCalledTimes(1)
    expect(fn2).toBeCalled().toBeCalledTimes(2)

    bus.emit({
      name: 'test',
      filter: (_, index) => index === 0 || index === 1,
    })
    expect(fn).toBeCalled().toBeCalledTimes(3)
    expect(fn1).toBeCalled().toBeCalledTimes(2)
    expect(fn2).toBeCalled().toBeCalledTimes(2)
  })
})

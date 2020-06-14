import { EventBus } from './EventBus'

type Events = {
  enter: () => number
  success: () => any
  error: (payload: { message: string }) => any
}

describe(EventBus.name, () => {
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
    bus.once('success', successCallback)
    bus.emit('success')
    bus.emit('success')
    bus.emit('success')
    bus.emit('success')
    expect(successCallback).toBeCalled().toBeCalledTimes(1)
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
})

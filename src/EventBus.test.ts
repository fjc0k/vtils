import { EventBus } from './EventBus'

test('表现正常', () => {
  type Listener = {
    success: () => void,
    error: (e: { message: string }) => void,
  }
  const bus = new EventBus<Listener>()

  const successListener: Listener['success'] = jest.fn()
  const errorListener: Listener['error'] = jest.fn()

  bus.on('success', successListener)
  bus.once('error', errorListener)

  bus.emit('success')
  bus.emit('error', { message: '出错啦' })

  expect(successListener).toBeCalledTimes(1)
  expect(errorListener).toBeCalledTimes(1)
  expect(errorListener).toBeCalledWith({ message: '出错啦' })

  bus.emit('success')
  bus.emit('error', { message: '出错啦' })

  expect(successListener).toBeCalledTimes(2)
  expect(errorListener).toBeCalledTimes(1)

  bus.off('success')

  bus.emit('success')

  expect(successListener).toBeCalledTimes(2)
})

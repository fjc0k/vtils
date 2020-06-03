import { bindEvent } from './bindEvent'

describe('bindEvent', () => {
  test('绑定事件正常', () => {
    const handleClick = jest.fn()
    const handleTouch = jest.fn()

    const bindWindowEvent = bindEvent(window)
    bindWindowEvent('click', handleClick)
    bindWindowEvent('touchstart', handleTouch)

    window.dispatchEvent(new Event('click'))
    expect(handleClick).toBeCalled().toBeCalledTimes(1)
    expect(handleTouch).not.toBeCalled()

    window.dispatchEvent(new Event('touchstart'))
    expect(handleClick).toBeCalled().toBeCalledTimes(1)
    expect(handleTouch).toBeCalled().toBeCalledTimes(1)

    window.dispatchEvent(new Event('touchstart'))
    expect(handleClick).toBeCalled().toBeCalledTimes(1)
    expect(handleTouch).toBeCalled().toBeCalledTimes(2)
  })

  test('解绑事件正常', () => {
    const handleClick = jest.fn()

    const bindWindowEvent = bindEvent(window)
    const unbindClick = bindWindowEvent('click', handleClick)

    window.dispatchEvent(new Event('click'))
    expect(handleClick).toBeCalled().toBeCalledTimes(1)

    unbindClick()
    window.dispatchEvent(new Event('click'))
    expect(handleClick).toBeCalled().toBeCalledTimes(1)
  })
})

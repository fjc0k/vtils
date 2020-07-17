import * as Taro from '@tarojs/taro'
import { AnyFunction } from '../types'
import { renderHook } from '@testing-library/react-hooks'

describe('useWindowSize.taro', () => {
  const getSystemInfoSync: any = jest.fn().mockImplementation(() => ({
    model: 'iPhone 5',
    pixelRatio: 2,
    windowWidth: 320,
    windowHeight: 520,
    system: 'iOS 10.0.1',
    language: 'zh_CN',
    version: '7.0.4',
    screenWidth: 320,
    screenHeight: 568,
    SDKVersion: '2.8.0',
    brand: 'devtools',
    fontSizeSetting: 16,
    batteryLevel: 100,
    statusBarHeight: 20,
    safeArea: {
      right: 320,
      bottom: 568,
      left: 0,
      top: 20,
      width: 320,
      height: 548,
    },
    deviceOrientation: 'portrait',
    platform: 'devtools',
  }))
  const onWindowResize: AnyFunction = jest.fn()
  const offWindowResize: AnyFunction = jest.fn()

  beforeAll(() => {
    jest.mock(
      '@tarojs/taro',
      () =>
        ({
          getSystemInfoSync: getSystemInfoSync,
          onWindowResize: onWindowResize,
          offWindowResize: offWindowResize,
        } as typeof Taro),
    )
  })

  test('表现正常', async () => {
    const { useWindowSize } = await import('./useWindowSize.taro')
    const { result } = renderHook(() => useWindowSize())

    expect(getSystemInfoSync).toBeCalled().toBeCalledTimes(1)
    expect(onWindowResize).toBeCalled().toBeCalledTimes(1)

    expect(result.current).toEqual({
      width: 320,
      height: 520,
    })
  })
})

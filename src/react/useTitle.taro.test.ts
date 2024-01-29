import * as Taro from '@tarojs/taro'
import { act, renderHook } from '@testing-library/react-hooks'
import { useState } from 'react'
import { AnyFunction } from '../types/index.ts'

describe('useTitle.taro', () => {
  const setNavigationBarTitle: AnyFunction = jest.fn()

  beforeAll(() => {
    jest.doMock(
      '@tarojs/taro',
      () =>
        ({
          setNavigationBarTitle: setNavigationBarTitle,
        } as typeof Taro),
    )
  })

  test('表现正常', async () => {
    const { useTitle } = await import('./useTitle.taro.ts')
    const { result } = renderHook(() => {
      const [title, setTitle] = useState('')
      useTitle(title)
      return { setTitle }
    })

    expect(setNavigationBarTitle)
      .toBeCalled()
      .toBeCalledTimes(1)
      .toBeCalledWith({
        title: '',
      })

    act(() => result.current.setTitle('2'))

    expect(setNavigationBarTitle)
      .toBeCalled()
      .toBeCalledTimes(2)
      .toBeCalledWith({
        title: '2',
      })
  })
})

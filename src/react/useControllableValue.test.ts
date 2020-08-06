import { act, renderHook } from '@testing-library/react-hooks'
import { useControllableValue } from './useControllableValue'
import { useSetState } from 'react-use'

describe('useControllableValue', () => {
  test('表现正常', () => {
    const { result } = renderHook(() => {
      const [props, updateProps] = useSetState<
        Partial<{
          value: string
          defaultValue: string
          onChange: (value: string) => any
        }>
      >({
        defaultValue: '0',
        onChange: value => {
          updateProps({ value })
        },
      })
      const [value, setValue] = useControllableValue(props, {
        defaultValuePropName: 'defaultValue',
        valuePropName: 'value',
        callbackPropName: 'onChange',
      })
      return { props, value, setValue, updateProps }
    })
    expect(result.current.value).toBe('0')
    act(() => result.current.updateProps({ defaultValue: '0.1' }))
    expect(result.current.value).toBe('0')
    act(() => result.current.setValue('1'))
    expect(result.current.props.value).toBe(result.current.value).toBe('1')
    act(() => result.current.updateProps({ value: '2' }))
    expect(result.current.props.value).toBe(result.current.value).toBe('2')
  })

  test('defaultValue', () => {
    const { result } = renderHook(() => {
      const [value] = useControllableValue(
        {} as Partial<{
          value: string
          defaultValue: string
          onChange: (value: string) => any
        }>,
        {
          defaultValuePropName: 'defaultValue',
          valuePropName: 'value',
          callbackPropName: 'onChange',
          defaultValue: 'hello',
        },
      )
      return value
    })
    expect(result.current).toBe('hello')
  })

  test('alwaysUpdateValue', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useControllableValue(
        { value: '1' } as Partial<{
          value: string
          defaultValue: string
          onChange: (value: string) => any
        }>,
        {
          defaultValuePropName: 'defaultValue',
          valuePropName: 'value',
          callbackPropName: 'onChange',
        },
      )
      return { value, setValue }
    })
    expect(result.current.value).toBe('1')
    act(() => result.current.setValue('2'))
    expect(result.current.value).toBe('1')

    const { result: result2 } = renderHook(() => {
      const [value, setValue] = useControllableValue(
        { value: '1' } as Partial<{
          value: string
          defaultValue: string
          onChange: (value: string) => any
        }>,
        {
          defaultValuePropName: 'defaultValue',
          valuePropName: 'value',
          callbackPropName: 'onChange',
          alwaysUpdateValue: true,
        },
      )
      return { value, setValue }
    })
    expect(result2.current.value).toBe('1')
    act(() => result2.current.setValue('2'))
    expect(result2.current.value).toBe('2')
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { defineComponent } from './defineComponent.ts'

describe('defineComponent', () => {
  test('默认转发 ref', () => {
    const Button = defineComponent<
      { id?: number; kind: string },
      HTMLDivElement
    >({
      defaultProps: {
        id: 0,
      },
      component: function Button(props, ref) {
        return <div ref={ref} data-testid='button' />
      },
    })
    const buttonRef = React.createRef<HTMLDivElement>()
    const { queryByTestId } = render(<Button ref={buttonRef} kind='primary' />)
    expect(queryByTestId('button')).toBe(buttonRef.current)
  })

  test('不转发 ref', () => {
    const Button = defineComponent<
      { id?: number; kind: string },
      HTMLDivElement
    >({
      defaultProps: {
        id: 0,
      },
      forwardRef: false,
      component: function Button(props) {
        return <div data-testid='button2'>{props.kind}</div>
      },
    })
    const { queryByTestId } = render(<Button kind='primary' />)
    expect(queryByTestId('button2')!.innerHTML).toBe('primary')
  })

  test('组件的展示名称默认为组件函数的名称', () => {
    const Button = defineComponent({
      component: function Button() {
        return null
      },
    })
    expect(Button.displayName).toBe('Button')
  })

  test('可以通过选项 displayName 设置组件的展示名称', () => {
    const Button = defineComponent({
      displayName: 'XButton',
      component: function Button() {
        return null
      },
    })
    expect(Button.displayName).toBe('XButton')
  })
})

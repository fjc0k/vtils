import {buildFunctionComponentCreator, createFunctionComponent, RequiredProp} from './functionComponentCreator'
import {jestExpectEqual, tryGet} from 'vtils'

describe('createFunctionComponent', () => {
  test('无 props 的组件正常', () => {
    let Component!: any

    const Hello = createFunctionComponent(function MyComponent(props) {
      Component = MyComponent
      return [
        props.style,
        props.className,
        props.children,
      ] as any as React.ReactElement
    })

    // eslint-disable-next-line new-cap
    Hello({})

    jestExpectEqual(
      Hello,
      Component,
    )

    jestExpectEqual(
      tryGet(() => Hello.defaultProps!.className),
      undefined,
    )
  })

  test('有 props 的组件正常', () => {
    let Component!: any

    const defaultProps = {
      /** x */
      x: 1,
      /** y */
      y: 2,
      /** z */
      z: null as any as RequiredProp<string>,
    }

    const Hello = createFunctionComponent(
      defaultProps,
      function MyComponent(props) {
        Component = MyComponent
        return [
          props.style,
          props.className,
          props.children,
          props.x,
          props.y,
          props.z,
        ] as any as React.ReactElement
      },
    )

    // eslint-disable-next-line new-cap
    Hello({z: ''})

    jestExpectEqual(
      Hello,
      Component,
    )

    jestExpectEqual(
      Hello.defaultProps,
      defaultProps as any,
    )
  })
})

describe('buildFunctionComponentCreator', () => {
  test('extraProps 正常', () => {
    const createRedFunctionComponent = buildFunctionComponentCreator({
      extraProps: {
        red: false,
      },
    })

    const Hello = createRedFunctionComponent(props => {
      return [
        props.style,
        props.className,
        props.children,
        props.red,
      ] as any as React.ReactElement
    })

    jestExpectEqual(
      tryGet(() => Hello.defaultProps!.red),
      false,
    )
  })

  test('transformComponent 正常', () => {
    const createRedFunctionComponent = buildFunctionComponentCreator({
      transformComponent: Component => {
        (Component as any).__TEST__ = true
        return Component as (typeof Component) & {
          /** TEST */
          __TEST__: boolean,
        }
      },
    })

    const Hello = createRedFunctionComponent(props => {
      return [
        props.style,
        props.className,
        props.children,
      ] as any as React.ReactElement
    })

    jestExpectEqual(
      tryGet(() => Hello.__TEST__),
      true,
    )
  })

  test('extraProps & transformComponent 正常', () => {
    const createRedFunctionComponent = buildFunctionComponentCreator({
      extraProps: {
        red: true,
      },
      transformComponent: Component => {
        (Component as any).__TEST__ = true
        return Component as (typeof Component) & {
          /** TEST */
          __TEST__: boolean,
        }
      },
    })

    const Hello = createRedFunctionComponent(props => {
      return [
        props.style,
        props.className,
        props.children,
        props.red,
      ] as any as React.ReactElement
    })

    jestExpectEqual(
      tryGet(() => Hello.defaultProps!.red),
      true,
    )

    jestExpectEqual(
      tryGet(() => Hello.__TEST__),
      true,
    )
  })
})

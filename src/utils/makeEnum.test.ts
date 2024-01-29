import { makeEnum } from './makeEnum.ts'

describe('makeEnum', () => {
  test('支持数字', () => {
    expect(
      makeEnum({
        x: 1,
        y: 2,
        z: 3,
      }),
    ).toMatchObject({
      x: 1,
      y: 2,
      z: 3,
      1: 'x',
      2: 'y',
      3: 'z',
    })
  })

  test('支持字符串', () => {
    expect(
      makeEnum({
        x: '1',
        y: '2',
        z: '3',
      }),
    ).toMatchObject({
      x: '1',
      y: '2',
      z: '3',
      1: 'x',
      2: 'y',
      3: 'z',
    })
  })

  test('支持布尔值', () => {
    expect(
      makeEnum({
        x: true,
        y: false,
      }),
    ).toMatchObject({
      x: true,
      y: false,
      true: 'x',
      false: 'y',
    })
  })

  test('$list 正确', () => {
    expect(
      makeEnum({
        x: 1,
        y: 2,
        z: 3,
      }).$list,
    ).toMatchSnapshot()
    expect(
      makeEnum({
        x: '1',
        y: '2',
        z: '3',
      }).$list,
    ).toMatchSnapshot()
    expect(
      makeEnum({
        x: true,
        y: false,
      }).$list,
    ).toMatchSnapshot()
  })

  test('$buildList 正确', () => {
    expect(
      makeEnum({
        x: 1,
        y: 2,
        z: 3,
      }).$buildList(['x', 'y']),
    ).toMatchSnapshot()
    expect(
      makeEnum({
        x: true,
        y: false,
      }).$buildList({
        x: '是',
        y: '否',
      }),
    ).toMatchSnapshot()
  })

  test('$is 正确', () => {
    const status = makeEnum({
      x: '1',
      y: '2',
      z: '3',
    })
    expect(status.$is('1', 'x')).toBeTrue()
    expect(status.$is('1', '1')).toBeTrue()
    expect(status.$is('1', 'y')).toBeFalse()
    expect(status.$is('x', 'x')).toBeTrue()
    expect(status.$is('x', '1')).toBeTrue()
    expect(status.$is('x', 'y')).toBeFalse()

    const status2 = makeEnum({
      x: 1,
      y: 2,
      z: 3,
    })
    expect(status2.$is(1, 'x')).toBeTrue()
    expect(status2.$is(1, 1)).toBeTrue()

    const yesOrNo = makeEnum({
      x: true,
      y: false,
    })
    expect(yesOrNo.$is(false, 'x')).toBeFalse()
  })
})

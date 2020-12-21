import { createXml } from './createXml'

describe('createXml', () => {
  test('表现正常', () => {
    expect(
      createXml({
        id: 1,
        name: 'jay',
        close: false,
        content: createXml.cdata('大家好 > kkkdkkdkd ?'),
        desc: {
          ...createXml.attr({
            time: '2020',
          }),
          ...createXml.text('我是xxxx'),
        },
      }),
    ).toMatchSnapshot()
  })
})

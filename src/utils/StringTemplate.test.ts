import { StringTemplate } from './StringTemplate'

describe('StringTemplate', () => {
  test('ok', () => {
    expect(
      StringTemplate.render('{用户}爱你', {
        用户: 'hello',
      }),
    ).toBe('hello爱你')
    expect(
      StringTemplate.render('{用户}爱你', {
        用户: () => 'hello',
      }),
    ).toBe('hello爱你')
    expect(
      StringTemplate.render('{用户:2}爱你', {
        用户: (id: number) => `hello${id}`,
      }),
    ).toBe('hello2爱你')
    expect(
      StringTemplate.render('{用户:2,xx}爱你', {
        用户: (id: number, type: string) => `hello${id}${type}`,
      }),
    ).toBe('hello2xx爱你')
    expect(
      StringTemplate.render(
        `{用户性别}爱你{{用户性别==='男'?'啊':'哟' }}`,
        {
          用户性别: '男',
        },
        {
          code: true,
        },
      ),
    ).toBe('男爱你啊')
    expect(
      StringTemplate.render(
        `{用户性别}爱你{{用户性别==='男'?'啊':'哟' }}`,
        {
          用户性别: '女',
        },
        {
          code: true,
        },
      ),
    ).toBe('女爱你哟')
    expect(
      StringTemplate.render('{用户}爱你，${用户}', {
        用户: 'hello',
      }),
    ).toBe('hello爱你，$hello')
    expect(
      StringTemplate.render(
        '{用户}爱你，${用户}',
        {
          用户: 'hello',
        },
        {
          code: true,
        },
      ),
    ).toBe('hello爱你，${用户}')
  })

  test('onlyCode', () => {
    expect(
      StringTemplate.render(
        '{用户}爱你',
        {
          用户: 'hello',
        },
        {
          onlyCode: true,
        },
      ),
    ).toBe('{用户}爱你')
    expect(
      StringTemplate.render(
        '{{用户}}爱你',
        {
          用户: 'hello',
        },
        {
          onlyCode: true,
        },
      ),
    ).toBe('hello爱你')

    expect(
      StringTemplate.render(
        '{{ _.sum(1, 2) }}爱你{么}',
        {
          _: {
            sum(a: number, b: number) {
              return a + b
            },
          },
        },
        {
          onlyCode: true,
        },
      ),
    ).toBe('3爱你{么}')
  })
})

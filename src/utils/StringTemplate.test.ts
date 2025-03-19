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

  test('hasCodeBlock', () => {
    expect(StringTemplate.hasCodeBlock('ddd')).toBe(false)
    expect(StringTemplate.hasCodeBlock('{x}ddd')).toBe(false)
    expect(StringTemplate.hasCodeBlock('{{x}}ddd')).toBe(true)
    expect(StringTemplate.hasCodeBlock('{{x }}ddd')).toBe(true)
    expect(StringTemplate.hasCodeBlock('{{   x }}ddd')).toBe(true)
  })

  test('code返回null, undefined, true, false时置空', () => {
    expect(StringTemplate.render('{{null}}', {}, { onlyCode: true })).toBe('')
    expect(StringTemplate.render('{{undefined}}', {}, { onlyCode: true })).toBe(
      '',
    )
    expect(StringTemplate.render('{{true}}', {}, { onlyCode: true })).toBe('')
    expect(StringTemplate.render('{{false}}', {}, { onlyCode: true })).toBe('')
    expect(StringTemplate.render('{{0}}', {}, { onlyCode: true })).toBe('0')
  })

  test('支持截断省略', () => {
    expect(StringTemplate.render('{x#5}', { x: '0123456789' })).toBe('01...')
    expect(StringTemplate.render('{x#0}', { x: '0123456789' })).toBe(
      '0123456789',
    )
    expect(StringTemplate.render('{x#1}', { x: '0123456789' })).toBe('...')
    expect(StringTemplate.render('{x#8}', { x: '0123456789' })).toBe('01234...')
    expect(
      StringTemplate.render(
        '{x#8}',
        { x: '0123456789' },
        {
          code: true,
        },
      ),
    ).toBe('01234...')
  })

  test('替换前操作', () => {
    expect(
      StringTemplate.render(
        '{x}-{y}',
        { x: '4354', y: '+' },
        {
          beforeReplace: value => `${value}---`,
        },
      ),
    ).toBe('4354----+---')
  })
})

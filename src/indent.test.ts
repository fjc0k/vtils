import {dedent} from './dedent'
import {indent} from './indent'
import {jestExpectEqual} from './enhanceJest'

const text = 'a\nb\n c'

describe('支持标签模板字符串模式', () => {
  test('空字符串正常', () => {
    jestExpectEqual(
      indent``,
      '',
    )
  })

  test('插入值支持任意值', () => {
    jestExpectEqual(
      indent`${'x'}`,
      'x',
    )

    jestExpectEqual(
      indent`${2}`,
      '2',
    )

    jestExpectEqual(
      indent`${undefined}`,
      'undefined',
    )
  })

  test('单行缩进字符串正常', () => {
    jestExpectEqual(
      indent`  ${text}`,
      '  a\n  b\n   c',
    )
  })

  test('多行缩进字符串正常', () => {
    jestExpectEqual(
      indent`hi\n  ${text}`,
      'hi\n  a\n  b\n   c',
    )
  })

  test('只处理紧跟前导空白后面的插入值', () => {
    const x = indent`hi\n  ${text}  ${text}`
    const y = 'hi\n  a\n  b\n   c  a\nb\n c'
    jestExpectEqual(x, y)
  })

  test('bug 1', () => {
    const x = indent`x\n\n${text}`
    const y = 'x\n\na\nb\n c'
    jestExpectEqual(x, y)
  })
})

describe('支持函数模式', () => {
  test('表现正常', () => {
    jestExpectEqual(
      indent(text, '---'),
      '---a\n---b\n--- c',
    )

    jestExpectEqual(
      indent(
        dedent(`
          # Hello

          > nice to meet you!
        `),
        '//',
      ),
      '//# Hello\n//\n//> nice to meet you!',
    )
  })

  test('支持回调函数', () => {
    jestExpectEqual(
      indent(
        'hello\nworld',
        (lineStr, lineIndex) => `${lineIndex + 1}. `,
      ),
      '1. hello\n2. world',
    )

    jestExpectEqual(
      indent(
        'hello\nworld',
        lineStr => lineStr === 'hello' ? '+ ' : '- ',
      ),
      '+ hello\n- world',
    )
  })
})

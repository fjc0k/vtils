import { jestExpectEqual } from './enhanceJest'
import { tryGet } from './tryGet'

const obj = {
  x: 1,
  s: '字符串',
  y: {
    yy: {
      yyyy: {
        yyyyy: () => 'hello',
        yyyyy2: true,
      },
      yyyy2: [0, 1, 2, 3],
      yyyy3: /.+/,
    },
  },
  z: {
    zz: null,
    zzz: undefined,
    zzzz: 'hoho',
  },
}

test('表现正常', () => {
  jestExpectEqual(
    tryGet(() => obj.y.yy),
    obj.y.yy,
  )

  jestExpectEqual(
    tryGet(() => (obj as any).y.yy.xxx.ffs),
    undefined,
  )

  jestExpectEqual(
    tryGet(() => (obj as any).y.yy.xxx.ffs, 1),
    1,
  )
})

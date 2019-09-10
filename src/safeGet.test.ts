import {jestExpectEqual} from './enhanceJest'
import {safeGet} from './safeGet'

test('表现正常', () => {
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

  jestExpectEqual(
    safeGet(obj, 'x'),
    obj.x,
  )

  jestExpectEqual(
    safeGet(obj, 's', 'length'),
    obj.s.length,
  )

  jestExpectEqual(
    safeGet(obj, 'y', 'yy'),
    obj.y.yy,
  )

  jestExpectEqual(
    safeGet(obj, 'y', 'yy', 'yyyy2'),
    obj.y.yy.yyyy2,
  )

  jestExpectEqual(
    safeGet(obj, 'y', 'yy', 'yyyy2', 'slice'),
    obj.y.yy.yyyy2.slice,
  )

  jestExpectEqual(
    safeGet(obj, 'z', 'zz'),
    obj.z.zz,
  )

  jestExpectEqual(
    safeGet(obj, 'z', 'zzz'),
    obj.z.zzz,
  )

  jestExpectEqual(
    safeGet(obj, 'z', 'zzzz'),
    obj.z.zzzz,
  )

  jestExpectEqual(
    safeGet(obj as any, 'z', 'no', 'no1', 'no2'),
    undefined,
  )
})

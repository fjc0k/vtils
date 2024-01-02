import { RequiredDeep } from '../types'
import { VaeObjectSchema, VaeSchemaOf, v } from './vae'

describe('vae', () => {
  test('string', () => {
    expect(
      v
        .string()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(v.string().parse('')).toMatchSnapshot()
    expect(v.string().parse('hello')).toMatchSnapshot()

    expect(
      v
        .string()
        .required()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(
      v
        .string()
        .default('hello')
        .required()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(v.string().required().parse('')).toMatchSnapshot()
    expect(v.string().required().emptyable().parse('')).toMatchSnapshot()
    expect(v.string().required().parse('hello')).toMatchSnapshot()

    expect(v.string().required().min(6).parse('hello')).toMatchSnapshot()
    expect(v.string().required().max(2).parse('hello')).toMatchSnapshot()
    expect(v.string().required().length(3).parse('hello')).toMatchSnapshot()

    expect(v.string().required().email().parse('hello')).toMatchSnapshot()
    expect(
      v.string().required().email().parse('hello@gmail.com'),
    ).toMatchSnapshot()

    expect(
      v.string().required().url().parse('hello@gmail.com'),
    ).toMatchSnapshot()
    expect(
      v.string().required().url().parse('https://baidu.com'),
    ).toMatchSnapshot()

    expect(v.string().required().regex(/^\d+$/).parse('k2')).toMatchSnapshot()
    expect(v.string().required().regex(/^\d+$/).parse('234')).toMatchSnapshot()

    expect(v.string().required().includes('dd').parse('k2')).toMatchSnapshot()
    expect(
      v.string().required().includes('dd').parse('23dd4'),
    ).toMatchSnapshot()

    expect(v.string().required().startsWith('dd').parse('k2')).toMatchSnapshot()
    expect(
      v.string().required().startsWith('dd').parse('dd234'),
    ).toMatchSnapshot()

    expect(v.string().required().endsWith('dd').parse('k2')).toMatchSnapshot()
    expect(
      v.string().required().endsWith('dd').parse('234dd'),
    ).toMatchSnapshot()

    expect(v.string().required().phoneNumber().parse('k2')).toMatchSnapshot()
    expect(
      v.string().required().phoneNumber().parse('18080000000'),
    ).toMatchSnapshot()

    expect(v.string().required().idCardNumber().parse('k2')).toMatchSnapshot()
    expect(
      v.string().required().idCardNumber().parse('110101202305033210'),
    ).toMatchSnapshot()

    expect(
      v
        .string()
        .required()
        .trim()
        .idCardNumber()
        .parse('   110101202305033210'),
    ).toMatchSnapshot()
  })

  test('number', () => {
    expect(
      v
        .number()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(
      v.number().parse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(
      v.number().parse(
        // @ts-expect-error
        '3',
      ),
    ).toMatchSnapshot()
    expect(v.number().parse(3)).toMatchSnapshot()

    expect(
      v
        .number()
        .required()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(
      v
        .number()
        .default(3)
        .required()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(
      v.number().required().parse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(v.number().required().parse(3)).toMatchSnapshot()

    expect(v.number().required().min(6).parse(0)).toMatchSnapshot()
    expect(v.number().required().max(2).parse(0)).toMatchSnapshot()
    expect(v.number().required().lessThan(2).parse(0)).toMatchSnapshot()
    expect(v.number().required().moreThan(2).parse(0)).toMatchSnapshot()

    expect(v.number().required().integer().parse(0)).toMatchSnapshot()
    expect(v.number().required().integer().parse(-1)).toMatchSnapshot()
    expect(v.number().required().integer().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().integer().parse(1)).toMatchSnapshot()

    expect(v.number().required().positive().parse(1)).toMatchSnapshot()
    expect(v.number().required().positive().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().positive().parse(-1)).toMatchSnapshot()
    expect(v.number().required().positive().parse(0)).toMatchSnapshot()

    expect(v.number().required().nonpositive().parse(1)).toMatchSnapshot()
    expect(v.number().required().nonpositive().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().nonpositive().parse(-1)).toMatchSnapshot()
    expect(v.number().required().nonpositive().parse(0)).toMatchSnapshot()

    expect(v.number().required().negative().parse(1)).toMatchSnapshot()
    expect(v.number().required().negative().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().negative().parse(-1)).toMatchSnapshot()
    expect(v.number().required().negative().parse(0)).toMatchSnapshot()

    expect(v.number().required().nonnegative().parse(1)).toMatchSnapshot()
    expect(v.number().required().nonnegative().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().nonnegative().parse(-1)).toMatchSnapshot()
    expect(v.number().required().nonnegative().parse(0)).toMatchSnapshot()

    expect(v.number().required().positiveInteger().parse(1)).toMatchSnapshot()
    expect(v.number().required().positiveInteger().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().positiveInteger().parse(-1)).toMatchSnapshot()
    expect(v.number().required().positiveInteger().parse(0)).toMatchSnapshot()

    expect(v.number().required().id().parse(1)).toMatchSnapshot()
    expect(v.number().required().id().parse(1.2)).toMatchSnapshot()
    expect(v.number().required().id().parse(-1)).toMatchSnapshot()
    expect(v.number().required().id().parse(0)).toMatchSnapshot()
  })

  test('boolean', () => {
    expect(
      v
        .boolean()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(
      v.boolean().parse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()

    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse(''),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse(0),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse(NaN),
    ).toMatchSnapshot()

    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse('2'),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse(1),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .parse(33.33),
    ).toMatchSnapshot()
  })

  test('date', () => {
    expect(
      v
        .date()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()
    expect(
      v.date().parse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        // @ts-expect-error
        .parse(),
    ).toMatchSnapshot()

    expect(
      v.date().required().parse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        // @ts-expect-error
        .parse(new Date('2023-07-14T03:23:28.926Z').toISOString()),
    ).toMatchSnapshot()

    expect(
      v
        .date()
        .required()
        .min('2023-06-14T03:23:28.926Z', '应大于等于给定日期')
        .parse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        .min(new Date('2023-09-14T03:23:28.926Z'), '应大于等于给定日期')
        .parse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()

    expect(
      v
        .date()
        .required()
        .max('2023-06-14T03:23:28.926Z', '应小于等于给定日期')
        .parse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        .max(new Date('2023-09-14T03:23:28.926Z'), '应小于等于给定日期')
        .parse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
  })

  test('array', () => {
    expect(
      v.array<string[]>(v.string().required()).parse(
        // @ts-expect-error
        [1, '2'],
      ),
    ).toMatchSnapshot()
    expect(
      v.array<string[]>(v.string().required()).min(3).parse(
        // @ts-expect-error
        [1, '2'],
      ),
    ).toMatchSnapshot()
    expect(
      v.array<string[]>(v.string().required()).max(2).parse(
        // @ts-expect-error
        [1, '2'],
      ),
    ).toMatchSnapshot()
  })

  test('object', () => {
    const schema = v.object<{
      id: number
      name: string
      gender: 'male' | 'female'
      images: string[]
      isAdmin?: boolean
    }>({
      id: v.number().required().id(),
      name: v.string().required().max(10),
      gender: v.string(s => s.required().enum(['male', 'female'])),
      images: v.array(a => a.element(v.string().required()).default([])),
      isAdmin: v.boolean($ => $.default(false)),
    })
    expect(
      schema.parse(
        // @ts-expect-error
        { id: 1 },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-expect-error
        { id: 1, name: 'jack' },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-expect-error
        { id: 1, name: 'jack', gender: 'male' },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse({ id: 1, name: 'jack', gender: 'male', images: [''] }),
    ).toMatchSnapshot()
  })

  test('abortEarly', () => {
    const schema = v.object<{
      id: number
      images: string[]
    }>({
      id: v.number().required().id(),
      images: v.array(a =>
        a.required().element(v.string().required().url()).min(2),
      ),
    })

    expect(
      schema.parse({
        // @ts-expect-error
        images: 's',
      }),
    ).toMatchSnapshot()

    expect(
      schema.parse(
        {
          // @ts-expect-error
          images: 's',
        },
        {
          abortEarly: true,
        },
      ),
    ).toMatchSnapshot()

    expect(
      schema.parse({
        id: 1,
        images: ['http://baidu.com', 'ddd', 'dddd3'],
      }),
    ).toMatchSnapshot()

    expect(
      schema.parse(
        {
          id: 1,
          images: ['http://baidu.com', 'ddd', 'dddd3'],
        },
        {
          abortEarly: true,
        },
      ),
    ).toMatchSnapshot()
  })

  test('preserveUnknownKeys', () => {
    const schema = v.object<{
      id: number
    }>({
      id: v.number().required().id(),
    })

    expect(
      schema.parse({
        id: 1,
        // @ts-expect-error
        name: 'sss',
      }),
    ).toMatchSnapshot()

    expect(
      schema.parse(
        {
          id: 1,
          // @ts-expect-error
          name: 'sss',
        },
        {
          preserveUnknownKeys: true,
        },
      ),
    ).toMatchSnapshot()
  })

  test('case: pass1-pass2', () => {
    const schema = v
      .object<{
        password: string
        password2: string
      }>({
        password: v.string().required(),
        password2: v.string().required(),
      })
      .custom(
        ({ password, password2 }) => password === password2,
        '密码2应等于密码1',
      )

    expect(
      schema.parse({
        password: '123',
        password2: '456',
      }),
    ).toMatchSnapshot()

    expect(
      schema.parse({
        password: '123',
        password2: '123',
      }),
    ).toMatchSnapshot()

    const schema2 = v
      .object<{
        password: string
        password2: string
      }>({
        password: v.string().required(),
        password2: v.string().required(),
      })
      .custom(({ password, password2 }) => password === password2, {
        message: '密码2应等于密码1',
        path: 'password2',
      })

    expect(
      schema2.parse({
        password: '123',
        password2: '456',
      }),
    ).toMatchSnapshot()

    expect(
      schema2.parse({
        password: '123',
        password2: '123',
      }),
    ).toMatchSnapshot()
  })

  test('optional', () => {
    const schema = v.string().required()
    expect(schema.parse('')).toMatchSnapshot()
    expect(schema.optional().parse('')).toMatchSnapshot()
    // 没有 clone 被 optional 影响了
    expect(schema.parse('')).toMatchSnapshot()
  })

  test('clone', () => {
    const schema = v.string().required()
    expect(schema.parse('')).toMatchSnapshot()
    expect(schema.clone().optional().parse('')).toMatchSnapshot()
    expect(schema.parse('')).toMatchSnapshot()
  })

  test('pickFields, omitFields', () => {
    const schema = v.object({
      id: v.number().required(),
      name: v.string().required(),
    })
    expect(
      schema.parse({
        id: 0,
        name: 'jack',
      }),
    ).toMatchSnapshot()
    expect(
      schema.clone().pickFields(['id']).parse({
        id: 0,
        // @ts-expect-error
        name: 'jack',
      }),
    ).toMatchSnapshot()
    expect(
      schema.clone().omitFields(['id']).parse({
        // @ts-expect-error
        id: 0,
        name: 'jack',
      }),
    ).toMatchSnapshot()
    expect(
      schema.clone().pickFields(['id']).parse({
        id: 0,
      }),
    ).toMatchSnapshot()
    expect(
      schema.clone().omitFields(['id']).parse({
        name: 'jack',
      }),
    ).toMatchSnapshot()
  })

  test('optionalFields, requiredFields', () => {
    const schema = v.object<{
      id: number
      name?: string
    }>({
      id: v.number().required(),
      name: v.string(),
    })
    expect(
      schema.parse({
        id: 0,
      }),
    ).toMatchSnapshot()
    expect(
      schema.clone().requiredFields(['name']).parse(
        // @ts-expect-error
        {
          id: 0,
        },
      ),
    ).toMatchSnapshot()
    expect(schema.clone().optionalFields(['id']).parse({})).toMatchSnapshot()
    expect(
      schema.clone().requiredFields().parse(
        // @ts-expect-error
        {
          id: 0,
        },
      ),
    ).toMatchSnapshot()
    expect(schema.clone().optionalFields().parse({})).toMatchSnapshot()
  })

  test('create', () => {
    const schema = v.create<VaeSchemaOf<string>>(_ => _.string().required())
    expect(schema.parse('1')).toMatchSnapshot()

    const schema2: VaeSchemaOf<{
      id: number
    }> = v.create(_ =>
      _.object({
        id: _.number().required(),
      }),
    )
    expect(
      schema2.parse({
        id: 1,
      }),
    ).toMatchSnapshot()
  })

  test('reach', () => {
    const schema = v.object<{
      id: number
      images: string[]
      extra: {
        gender: number
      }
      type: number
    }>({
      id: v.number().required().id(),
      images: v.array(a => a.required().element(v.string())),
      extra: v.object({
        gender: v.number().required().enum([0, 1]),
      }),
      type: v.number().enum([3, 4]),
    })

    expect(
      schema.parse({
        id: 0,
        images: [],
        extra: {
          gender: 3,
        },
        type: 5,
      }),
    ).toMatchSnapshot()
    expect(schema.reach('extra.gender').parse(1)).toMatchSnapshot()
    expect(schema.reach('extra.gender').parse(2)).toMatchSnapshot()
    expect(
      schema.reach(['extra.gender', 'images.0'])['images.0'].parse(
        // @ts-expect-error
        false,
      ),
    ).toMatchSnapshot()
  })

  test('cast', () => {
    const schema = v.object<{
      id: number
      images: string[]
      extra: {
        gender: number
      }
      type: number
    }>({
      id: v.number().required().id(),
      images: v.array(a => a.required().element(v.string())),
      extra: v.object({
        gender: v.number().required().enum([0, 1]),
      }),
      type: v.number().enum([3, 4]),
    })
    expect(
      schema.cast({
        images: ['2'],
        extra: {},
        type: 2,
        ddd: 1,
      }),
    ).toMatchSnapshot()
    expect(
      schema.cast(
        {
          id: '1',
          images: ['2'],
          extra: {},
          type: 2,
          ddd: 1,
        },
        {
          preserveUnknownKeys: true,
        },
      ),
    ).toMatchSnapshot()
  })

  test('可覆盖定义', () => {
    expect(v.string().min(3).parse('12')).toMatchSnapshot()
    expect(v.string().min(3).min(2).parse('12')).toMatchSnapshot()

    expect(v.number().max(3).parse(4)).toMatchSnapshot()
    expect(v.number().max(3).max(8).parse(4)).toMatchSnapshot()
  })

  test('runtime', () => {
    const schema = v
      .object({
        status: v.boolean().required(),
        name: v.string().required(),
      })
      .runtime(({ value, schema }) => {
        if (value.status === false) {
          schema.reach('name').optional()
        }
      })
    expect(
      schema.parse({
        status: true,
        name: 'ffff',
      }),
    ).toMatchSnapshot()
    expect(
      schema.parse({
        status: false,
        name: 'ffff',
      }),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-expect-error
        {
          status: true,
        },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-expect-error
        {
          status: false,
        },
      ),
    ).toMatchSnapshot()
  })

  test('parseOrThrow', () => {
    expect(() =>
      v.string().min(3).parseOrThrow('12'),
    ).toThrowErrorMatchingSnapshot()
    expect(() =>
      v
        .object({
          id: v.number().required(),
          name: v.string().min(3).regex(/^56/),
        })
        .parseOrThrow(
          // @ts-expect-error
          {
            name: '12',
          },
        ),
    ).toThrowErrorMatchingSnapshot()
  })

  test('meta', () => {
    expect(
      v.string().min(3).meta({ x: 1, y: '222' }).options.metadata,
    ).toMatchSnapshot()
  })

  test('x | undefined', () => {
    type X = string | undefined
    const schema = v.string<X>()
    expect(schema.parse('test')).toMatchSnapshot()
    expect(schema.parse(undefined)).toMatchSnapshot()
  })

  test('综合', () => {
    type Data = {
      userId: number
      gender?: 'male' | 'female' | 'unknown'
      name: string
      campus?: string
      college?: string
      identityId: number
      grade?: number
      school?: string
      major?: string
      class?: string
      studentNumber?: string
      idNumber?: string
      companyName?: string
    }
    const _ = v
    const schema: VaeSchemaOf<Data> = _.object($ =>
      $.shape({
        userId: _.number().required().id(),
        gender: _.string(),
        name: _.string().required().max(20),
        campus: _.string($ => $.max(20)),
        college: _.string($ => $.max(20)),
        identityId: _.number().required().id(),
        grade: _.number($ => $.positiveInteger()),
        school: _.string($ => $.max(20)),
        major: _.string($ => $.max(20)),
        class: _.string($ => $.max(20)),
        studentNumber: _.string($ => $.max(20)),
        idNumber: _.string($ => $.max(18).idCardNumber()),
        companyName: _.string($ => $.max(50)),
      }),
    )
    expect(
      schema.parse({
        name: '成龙',
        identityId: 1,
        userId: 1,
        gender: 'male',
      }),
    ).toMatchSnapshot()
  })

  test('综合2', () => {
    type Data = {
      userId: number
      gender?: 'male' | 'female' | 'unknown'
      name: string
      campus?: string
      college?: string
      identityId: number
      grade?: number
      school?: string
      major?: string
      class?: string
      studentNumber?: string
      idNumber?: string
      companyName?: string
    }
    const _ = v
    const schema: VaeSchemaOf<Data> = _.object({
      userId: _.number().required().id(),
      gender: _.string(),
      name: _.string().required().max(20),
      campus: _.string().max(20),
      college: _.string().max(20),
      identityId: _.number().required().id(),
      grade: _.number().positiveInteger(),
      school: _.string().max(20),
      major: _.string().max(20),
      class: _.string().max(20),
      studentNumber: _.string().max(20),
      idNumber: _.string().max(18).idCardNumber(),
      companyName: _.string().max(50),
    })
    expect(
      schema.parse({
        name: '成龙',
        identityId: 1,
        userId: 1,
        gender: 'male',
      }),
    ).toMatchSnapshot()
  })

  test('shapeOfFields', () => {
    type Data = {
      userId: number
      gender?: 'male' | 'female' | 'unknown'
      name: string
      campus?: string
      college?: string
      identityId: number
      grade?: number
      school?: string
      major?: string
      class?: string
      studentNumber?: string
      idNumber?: string
      companyName?: string
    }
    const _ = v
    const schema: VaeSchemaOf<Data> = _.object({
      userId: _.number().required().id(),
      gender: _.string(),
      name: _.string().required().max(20),
      campus: _.string().max(20),
      college: _.string().max(20),
      identityId: _.number().required().id(),
      grade: _.number().positiveInteger(),
      school: _.string().max(20),
      major: _.string().max(20),
      class: _.string().max(20),
      studentNumber: _.string().max(20),
      idNumber: _.string().max(18).idCardNumber(),
      companyName: _.string().max(50),
    })
    expect(
      schema.parse({
        name: '成龙',
        identityId: 1,
        userId: 1,
        gender: 'male',
      }),
    ).toMatchSnapshot()

    const schema2: VaeSchemaOf<Pick<Data, 'name' | 'gender'> & { id: number }> =
      _.object({
        id: _.number().required(),
        ...schema.shapeOfFields(['name', 'gender']),
      })
    expect(
      schema2.parse({
        id: 1,
        name: '成龙',
        // @ts-expect-error
        identityId: 1,
        userId: 1,
        gender: 'male',
      }),
    ).toMatchSnapshot()

    const schema3: VaeSchemaOf<Data> = _.object(schema.shapeOfFields())
    expect(
      schema3.parse({
        name: '成龙',
        identityId: 1,
        userId: 1,
        gender: 'male',
      }),
    ).toMatchSnapshot()
  })

  test('requiredFieldsAtLeastOne', () => {
    type Data = {
      userId: number
      gender?: 'male' | 'female' | 'unknown'
      name?: string
      campus?: string
      college?: string
      identityId: number
      grade?: number
      school?: string
      major?: string
      class?: string
      studentNumber?: string
      idNumber?: string
      companyName?: string
    }
    const _ = v
    const schema: VaeSchemaOf<RequiredDeep<Data>> = _.object($ =>
      $.shape({
        userId: _.number().required().id(),
        gender: _.string<any>(),
        name: _.string().max(20),
        campus: _.string().max(20),
        college: _.string().max(20),
        identityId: _.number().required().id(),
        grade: _.number().positiveInteger(),
        school: _.string().max(20),
        major: _.string().max(20),
        class: _.string().max(20),
        studentNumber: _.string().max(20),
        idNumber: _.string().max(18).idCardNumber(),
        companyName: _.string().max(50),
      }).requiredFieldsAtLeastOne(['name', 'studentNumber', 'idNumber']),
    )
    expect(
      schema.parse(
        // @ts-ignore
        {
          identityId: 1,
          userId: 1,
          gender: 'male',
        },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-ignore
        {
          name: '成龙',
          identityId: 1,
          userId: 1,
          gender: 'male',
        },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-ignore
        {
          studentNumber: '11111',
          identityId: 1,
          userId: 1,
          gender: 'male',
        },
      ),
    ).toMatchSnapshot()
    expect(
      schema.parse(
        // @ts-ignore
        {
          idNumber: '220281197105291353',
          identityId: 1,
          userId: 1,
          gender: 'male',
        },
      ),
    ).toMatchSnapshot()
  })

  test('cuid, cuid2', () => {
    const schema: VaeObjectSchema<{
      cuid: string
      cuid2: string
    }> = v.create(_ =>
      _.object({
        cuid: _.string().cuid(),
        cuid2: _.string().cuid2(),
      }),
    )
    expect(schema.parse({ cuid: '1', cuid2: 'xxxxxx' })).toMatchSnapshot()
    expect(
      schema.parse({ cuid: 'clpw4etzi0000sgrl4uki28fv', cuid2: 'xxxxxx' }),
    ).toMatchSnapshot()
    expect(
      schema.parse({
        cuid: 'clpw4etzi0000sgrl4uki28fv',
        cuid2: 'tz4a98xxat96iws9zmbrgj3a',
      }),
    ).toMatchSnapshot()
  })

  test('true, false', () => {
    const schema: VaeObjectSchema<{
      true: boolean
      false: boolean
    }> = v.create(_ =>
      _.object({
        true: _.boolean().true(),
        false: _.boolean().false(),
      }),
    )
    expect(schema.parse({ true: false, false: true })).toMatchSnapshot()
    expect(schema.parse({ true: true, false: false })).toMatchSnapshot()
  })
})

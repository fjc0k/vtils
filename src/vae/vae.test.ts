import { VaeSchemaOf, v } from './vae'

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
      isAdmin: v.boolean().default(false),
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
      .custom(
        ({ password, password2 }) => password === password2,
        '密码2应等于密码1',
        'password2',
      )

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
    const schema = v.create(_ => _.string().required())
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
})

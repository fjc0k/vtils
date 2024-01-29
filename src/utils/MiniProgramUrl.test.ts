import { MiniProgramUrl } from './MiniProgramUrl.ts'

describe('MiniProgramUrl', () => {
  test('ok', () => {
    expect(
      new MiniProgramUrl(
        'mp://{"appId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      ).toJson(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl(
        'mp://{"appId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      ).toString(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl(
        'mp://{"appId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      )
        .update({
          path: '/pages/user?id=333',
        })
        .toJson(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl(
        'mp://{"appId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      ).toWxOpenLaunchWeappAttrs(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl(
        'mp://{"rawId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      ).toWxOpenLaunchWeappAttrs(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl({
        rawId: 'testApp',
        path: '/pages/home?from=223&se=33',
      }).toWxOpenLaunchWeappAttrs(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl({
        rawId: 'testApp',
        path: '/pages/home?from=223&se=33',
      }).toString(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl({
        rawId: 'testApp',
        path: 'pages/home?from=223&se=33',
      }).toString(),
    ).toMatchSnapshot()
    expect(
      new MiniProgramUrl({
        appId: 'testApp',
        path: '/pages/home?from=223&se=33',
      }).toWxNavigateToMiniProgramParams(),
    ).toMatchSnapshot()
    expect(
      MiniProgramUrl.is(
        'mp://{"rawId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      ),
    ).toBeTrue()
    expect(
      MiniProgramUrl.is(
        // @ts-expect-error
        'https://{"rawId":"testApp","path":"/pages/index","query":{"x":"1"}}',
      ),
    ).toBeFalse()
  })
})

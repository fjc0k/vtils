import * as env from './env'
import { has } from './has'
import { jestExpectEqual } from './enhanceJest'

const tests: Record<keyof typeof env, (_: typeof env) => void> = {
  getGlobal({ getGlobal }) {
    jestExpectEqual(
      getGlobal(),
      window,
    )
  },

  inBrowser({ inBrowser }) {
    jestExpectEqual(
      inBrowser(),
      true,
    )
  },

  inIOS({ inIOS }) {
    jestExpectEqual(
      inIOS(),
      false,
    )

    Object.defineProperty(navigator, 'platform', {
      value: 'iPad',
    })
    inIOS.clearCache()
    jestExpectEqual(
      inIOS(),
      true,
    )
  },

  inNode({ inNode }) {
    jestExpectEqual(
      inNode(),
      true,
    )
  },

  inWechatMiniProgram({ inWechatMiniProgram }) {
    jestExpectEqual(
      inWechatMiniProgram(),
      false,
    )

    Object.defineProperty(window, 'wx', {
      value: {
        getSystemInfo() {},
      },
    })
    inWechatMiniProgram.clearCache()
    jestExpectEqual(
      inWechatMiniProgram(),
      true,
    )
  },

  inWechatWebview({ inWechatWebview }) {
    jestExpectEqual(
      inWechatWebview(),
      false,
    )

    Object.defineProperty(navigator, 'userAgent', {
      value: 'micromessenger',
    })
    inWechatWebview.clearCache()
    jestExpectEqual(
      inWechatWebview(),
      true,
    )
  },
}

for (const key in tests) {
  if (has(tests, key)) {
    test(
      key,
      () => (tests as any)[key](env),
    )
  }
}

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
    delete inIOS._0_
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
    delete inWechatMiniProgram._0_
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
    delete inWechatWebview._0_
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

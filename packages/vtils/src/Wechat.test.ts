import {AnyFunction} from './enhanceType'
import {ii} from './ii'
import {jestExpectEqual} from './enhanceJest'
import {wait} from './wait'
import {Wechat} from './Wechat'

// 微信 JSSDK 模拟
ii(() => {
  let ready: boolean = false
  const readyCbs: AnyFunction[] = []
  const errorCbs: AnyFunction[] = []

  ;(global as any).wx = new Proxy({}, {
    get(_, method) {
      if (method === 'ready') {
        return (cb: AnyFunction) => {
          if (ready) return cb()
          if (readyCbs.length === 0) {
            wait(1000).then(() => {
              ready = true
              readyCbs.forEach(cb => cb())
            })
          }
          readyCbs.push(cb)
        }
      }

      if (method === 'error') {
        return (cb: AnyFunction) => {
          errorCbs.push(cb)
        }
      }

      return (params: { success: AnyFunction, fail: AnyFunction }) => {
        if (method === 'testFail') {
          return params.fail && params.fail()
        }
        if (method === 'testError') {
          errorCbs.forEach(cb => cb())
        }
        return params.success && params.success()
      }
    },
  })
})

const wechatConfigParams = {
  debug: false,
  appId: 'xxx',
  timestamp: 203093,
  nonceStr: 'dd',
  signature: 'xx',
  sharable: true,
  autoLoadJSSDK: true,
}

test('可以正常创建实例', () => {
  const wechat = new Wechat()

  jestExpectEqual(
    wechat instanceof Wechat,
    true,
  )

  jestExpectEqual(
    wechat.configParams,
    {},
  )
})

test('可以在创建实例时传入配置参数', () => {
  const wechat = new Wechat(wechatConfigParams)

  jestExpectEqual(
    wechat.configParams,
    wechatConfigParams,
  )
})

test('可以延后传入配置参数', () => {
  const wechat = new Wechat()
  wechat.config(wechatConfigParams)

  jestExpectEqual(
    wechat.configParams,
    wechatConfigParams,
  )
})

test('可以正常调用微信 JSSDK 的方法', async () => {
  const wechat = new Wechat(wechatConfigParams)

  expect(wechat.invoke('addCard')).resolves.toBeUndefined()
  expect(wechat.invoke('checkJsApi')).resolves.toBeUndefined()
  expect(wechat.invoke('chooseImage', {})).resolves.toBeUndefined()
})

test('可以正常处理调用微信 JSSDK 的方法失败的情况', () => {
  const wechat = new Wechat(wechatConfigParams)

  expect(wechat.invoke('testFail' as any)).rejects.toBeUndefined()
})

test('可以收集错误信息', async () => {
  const wechat = new Wechat(wechatConfigParams)

  const errHandler0 = jest.fn()
  const errHandler1 = jest.fn()
  const errHandler2 = jest.fn()

  wechat.onError(errHandler0)
  wechat.onError(errHandler1)

  await wechat.invoke('testError' as any)

  wechat.onError(errHandler2)

  expect(errHandler0).toBeCalledTimes(1)
  expect(errHandler1).toBeCalledTimes(1)
  expect(errHandler2).toBeCalledTimes(0)
})

test('正常调用内置方法', async () => {
  const wechat = new Wechat(wechatConfigParams)

  expect(wechat.checkJsApi(['chooseImage'])).resolves.toBeUndefined()
  expect(wechat.updateShareData({})).resolves.toBeUndefined()
  expect(wechat.chooseImage()).resolves.toBeUndefined()
  expect(wechat.previewImage({urls: ['https://foo.bar']})).resolves.toBeUndefined()
  expect(wechat.uploadImage({localId: 'ss'})).resolves.toBeUndefined()
  expect(wechat.closeWindow()).resolves.toBeUndefined()
  expect(wechat.hideNonBaseMenuItems(['menuItem:share:brand'])).resolves.toBeUndefined()
  expect(wechat.showNonBaseMenuItems(['menuItem:originPage'])).resolves.toBeUndefined()
  expect(wechat.hideAllNonBaseMenuItems()).resolves.toBeUndefined()
  expect(wechat.showAllNonBaseMenuItems()).resolves.toBeUndefined()
})

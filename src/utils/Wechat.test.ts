import { AnyFunction } from '../types'
import { wait } from './wait'
import { Wechat } from './Wechat'

describe('Wechat', () => {
  beforeAll(() => {
    let ready = false
    const readyCbs: AnyFunction[] = []
    const errorCbs: AnyFunction[] = []

    ;(window as any).wx = new Proxy(
      {},
      {
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

          return (params: { success: AnyFunction; fail: AnyFunction }) => {
            if (method === 'testFail') {
              return params.fail && params.fail()
            }
            if (method === 'testError') {
              errorCbs.forEach(cb => cb())
            }
            return params.success && params.success({})
          }
        },
      },
    )
  })

  const wechatConfigParams = {
    debug: false,
    appId: 'xxx',
    timestamp: 203093,
    nonceStr: 'dd',
    signature: 'xx',
    sharable: true,
    autoLoadJSSDK: '1.4.1',
  }

  test('可以正常创建实例', () => {
    const wechat = new Wechat()

    expect(wechat).toBeInstanceOf(Wechat)
    expect(wechat.configParams).toEqual({})
  })

  test('可以在创建实例时传入配置参数', () => {
    const wechat = new Wechat(wechatConfigParams)

    expect(wechat.configParams).toEqual(wechatConfigParams)
  })

  test('可以延后传入配置参数', () => {
    const wechat = new Wechat()
    wechat.config(wechatConfigParams)

    expect(wechat.configParams).toEqual(wechatConfigParams)
  })

  test('可以正常调用微信 JSSDK 的方法', async () => {
    const wechat = new Wechat(wechatConfigParams)

    await expect(wechat.invoke('addCard')).toResolve()
    await expect(wechat.invoke('chooseImage', {})).toResolve()
  })

  test('可以正常处理调用微信 JSSDK 的方法失败的情况', async () => {
    const wechat = new Wechat(wechatConfigParams)

    await expect(wechat.invoke('testFail' as any)).toReject()
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

    await expect(wechat.checkJsApi(['chooseImage'])).toResolve()
    await expect(wechat.updateShareData({})).toResolve()
    await expect(wechat.chooseImage()).toResolve()
    await expect(wechat.previewImage({ urls: ['https://foo.bar'] })).toResolve()
    await expect(wechat.uploadImage({ localId: 'ss' })).toResolve()
    await expect(wechat.closeWindow()).toResolve()
    await expect(
      wechat.hideNonBaseMenuItems(['menuItem:share:brand']),
    ).toResolve()
    await expect(
      wechat.showNonBaseMenuItems(['menuItem:originPage']),
    ).toResolve()
    await expect(wechat.hideAllNonBaseMenuItems()).toResolve()
    await expect(wechat.showAllNonBaseMenuItems()).toResolve()
    await expect(
      wechat.openLocation({ latitude: 60, longitude: 40, name: '云南' }),
    ).toResolve()
  })

  test('beforeInvoke 正常', async () => {
    const wechat = new Wechat()
    const invokeHistory: any = []
    wechat.beforeInvoke((jsApi, params) => {
      invokeHistory.push({
        jsApi,
        params,
      })
    })
    wechat.config(wechatConfigParams)
    await wechat.updateShareData({})
    await wechat.closeWindow()
    expect(invokeHistory).toMatchSnapshot()
  })
})

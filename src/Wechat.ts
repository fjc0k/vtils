import { EventBus } from './EventBus'
import { isBoolean } from './isBoolean'
import { promiseSeries } from './promiseSeries'

declare const wx: any

export type WechatJsApi = (
  'checkJsApi' |
  'updateAppMessageShareData' |
  'updateTimelineShareData' |
  'onMenuShareTimeline' |
  'onMenuShareAppMessage' |
  'onMenuShareQQ' |
  'onMenuShareQZone' |
  'startRecord' |
  'stopRecord' |
  'onVoiceRecordEnd' |
  'playVoice' |
  'pauseVoice' |
  'stopVoice' |
  'onVoicePlayEnd' |
  'uploadVoice' |
  'downloadVoice' |
  'chooseImage' |
  'previewImage' |
  'uploadImage' |
  'downloadImage' |
  'translateVoice' |
  'getNetworkType' |
  'openLocation' |
  'getLocation' |
  'hideOptionMenu' |
  'showOptionMenu' |
  'hideMenuItems' |
  'showMenuItems' |
  'hideAllNonBaseMenuItem' |
  'showAllNonBaseMenuItem' |
  'closeWindow' |
  'scanQRCode' |
  'chooseWXPay' |
  'openProductSpecificView' |
  'addCard' |
  'chooseCard' |
  'openCard'
)

export interface WechatConfigParams {
  /**
   * 开启调试模式。
   *
   * 调用的所有api的返回值会在客户端 alert 出来，
   * 若要查看传入的参数，可以在 pc 端打开，
   * 参数信息会通过 log 打出，仅在 pc 端时才会打印。
   *
   * @default false
   */
  debug?: boolean,
  /**
   * 公众号的唯一标识。
   */
  appId: string,
  /**
   * 生成签名的时间戳。
   */
  timestamp: number | string,
  /**
   * 生成签名的随机串。
   */
  nonceStr: string,
  /**
   * 签名。
   */
  signature: string,
  /**
   * 需要使用的JS接口列表。
   *
   * @default []
   */
  jsApiList?: WechatJsApi[],
  /**
   * 是否可分享。
   *
   * 设置为 `true` 将把分享系列接口自动加入 `jsApiList`。
   *
   * @default false
   */
  sharable?: boolean,
}

export type WechatErrorCallback = (err: any) => void

export interface WechatUpdateShareDataParams {
  /** 分享标题 */
  title?: string,
  /** 分享描述 */
  desc?: string,
  /** 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致 */
  link?: string,
  /** 分享图标地址 */
  imgUrl?: string,
}

export interface WechatChooseImageParams {
  /**
   * 选择图片数量。
   *
   * @default 9
   */
  count?: number,
  /**
   * 图片质量，可以指定是原图还是压缩图。
   *
   * @default ['original', 'compressed']
   */
  sizeType?: Array<'original' | 'compressed'>,
  /**
   * 选择来源，可以指定是相册还是相机。
   *
   * @default ['album', 'camera']
   */
  sourceType?: Array<'album' | 'camera'>,
}

export interface WechatPreviewImageParams {
  /**
   * 当前显示图片的链接。
   *
   * @default urls[0]
   */
  current?: string,
  /**
   * 需要预览的图片链接列表。
   */
  urls: string[],
}

export interface WechatUploadImageParams {
  /**
   * 需要上传的图片的本地 ID，由 chooseImage 接口获得。
   */
  localId: string,
  /**
   * 是否显示进度提示。
   *
   * @default false
   */
  isShowProgressTips?: boolean,
}

export type WechatNonBaseMenuItem = (
  'menuItem:share:appMessage' |
  'menuItem:share:timeline' |
  'menuItem:share:qq' |
  'menuItem:share:weiboApp' |
  'menuItem:favorite' |
  'menuItem:share:facebook' |
  'menuItem:share:QZone' |
  'menuItem:editTag' |
  'menuItem:delete' |
  'menuItem:copyUrl' |
  'menuItem:originPage' |
  'menuItem:readMode' |
  'menuItem:openWithQQBrowser' |
  'menuItem:openWithSafari' |
  'menuItem:share:email' |
  'menuItem:share:brand'
)

const shareJsApiList: WechatJsApi[] = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareAppMessage',
  'onMenuShareTimeline',
  'onMenuShareQQ',
  'onMenuShareQZone',
]

export class Wechat {
  private ready: boolean = false

  private bus = new EventBus<{
    ready: () => void,
    error: WechatErrorCallback,
  }>()

  private prevShareParams: WechatUpdateShareDataParams = {}

  constructor(params?: WechatConfigParams) {
    if (params) {
      this.config(params)
    }
  }

  config(params: WechatConfigParams) {
    if (typeof wx === 'undefined') {
      throw new Error('请先引入微信 JSSDK')
    }
    const sharable = isBoolean(params.sharable) ? params.sharable : false
    wx.config({
      ...params,
      jsApiList: [
        ...(params.jsApiList || []),
        ...(sharable ? shareJsApiList : []),
      ],
    })
    wx.ready(() => {
      this.ready = true
      this.bus.emit('ready')
    })
    wx.error((err: any) => {
      this.bus.emit('error', err)
    })
  }

  checkJsApi<T extends WechatJsApi>(jsApiList: T[]): Promise<Record<T, boolean>> {
    return this.invoke('checkJsApi', { jsApiList })
      .then(res => res.checkResult)
  }

  updateShareData(params: WechatUpdateShareDataParams): Promise<any> {
    params = {
      ...this.prevShareParams,
      ...params,
    }
    this.prevShareParams = params
    return promiseSeries(
      shareJsApiList.map(
        jsApi => () => this.invoke(jsApi, params),
      ),
    )
  }

  chooseImage(params?: WechatChooseImageParams): Promise<string[]> {
    return this.invoke('chooseImage', params)
      .then(res => res.localIds)
  }

  previewImage(params: WechatPreviewImageParams): Promise<any> {
    return this.invoke('previewImage', {
      urls: params.urls,
      current: params.current || params.urls[0],
    })
  }

  uploadImage(params: WechatUploadImageParams): Promise<string[]> {
    return this.invoke('uploadImage', {
      localId: params.localId,
      isShowProgressTips: params.isShowProgressTips ? 1 : 0,
    })
  }

  closeWindow(): Promise<any> {
    return this.invoke('closeWindow')
  }

  hideNonBaseMenuItems(menuList: WechatNonBaseMenuItem[]): Promise<any> {
    return this.invoke('hideMenuItems', { menuList })
  }

  showNonBaseMenuItems(menuList: WechatNonBaseMenuItem[]): Promise<any> {
    return this.invoke('showMenuItems', { menuList })
  }

  hideAllNonBaseMenuItems(): Promise<any> {
    return this.invoke('hideAllNonBaseMenuItem')
  }

  showAllNonBaseMenuItems(): Promise<any> {
    return this.invoke('showAllNonBaseMenuItem')
  }

  onError(callback: WechatErrorCallback) {
    this.bus.on('error', callback)
  }

  private invoke(jsApi: WechatJsApi, params: Record<string, any> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof wx === 'undefined') return reject('请先引入微信 JSSDK')
      if (!wx[jsApi]) return reject(`wx.${jsApi} 不可用`)
      const invoke = () => {
        wx[jsApi]({
          ...params,
          success: resolve,
          fail: reject,
        })
      }
      if (this.ready) {
        invoke()
      } else {
        this.bus.once('ready', invoke)
      }
    })
  }
}

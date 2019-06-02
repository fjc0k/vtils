import { EventBus } from './EventBus'
import { isBoolean } from './is'
import { loadResource, LoadResourceUrlType } from './loadResource'
import { sequential } from './sequential'

declare const wx: any

/**
 * 微信 JSSDK 支持的 API。
 */
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
  /**
   * 是否自动引入微信 JSSDK。
   *
   * @default true
   */
  autoLoadJSSDK?: boolean,
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

/**
 * 微信内网页的非基础菜单列表。
 */
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

/**
 * 微信 JSSDK 支持的分享 API 列表。
 */
const shareJsApiList: WechatJsApi[] = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareAppMessage',
  'onMenuShareTimeline',
  'onMenuShareQQ',
  'onMenuShareQZone',
]

/**
 * 对微信 JSSDK 的封装。
 *
 * @example
 * ```ts
 * const wechat = new Wechat()
 * getWechatConfigAsync().then(config => {
 *   wechat.config(config)
 * })
 * wechat.updateShareData({
 *   title: '分享标题',
 *   desc: '分享描述',
 *   link: '分享链接',
 *   imgUrl: '缩略图地址',
 * })
 * wechat.invoke('scanQRCode').then(res => {
 *   // => API 调用结果
 * })
 * ```
 */
export class Wechat {
  /**
   * 微信 JSSDK 是否已准备完成。
   */
  private ready: boolean = false

  /**
   * 消息巴士。
   */
  private bus = new EventBus<{
    /**
     * 微信 JSSDK 准备完成时触发。
     */
    ready: () => void,
    /**
     * 调用微信 JSSDK 出错时时触发。
     */
    error: WechatErrorCallback,
  }>()

  /**
   * 上一次设置分享时的参数。
   */
  private prevShareParams: WechatUpdateShareDataParams = {}

  /**
   * 注入微信 `JSSDK` 的权限验证配置参数。
   */
  public configParams: WechatConfigParams = {} as any

  /**
   * 构造函数。
   *
   * @param params 注入微信 `JSSDK` 的权限验证配置参数
   */
  constructor(params?: WechatConfigParams) {
    if (params) {
      this.config(params)
    }
  }

  /**
   * 注入微信 `JSSDK` 的权限验证配置。
   *
   * @param params 配置参数
   */
  config(params: WechatConfigParams) {
    this.configParams = params

    const config = () => {
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

    if (typeof wx !== 'undefined') {
      config()
    } else {
      if (params.autoLoadJSSDK !== false) {
        loadResource({
          type: LoadResourceUrlType.js,
          path: 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
          alternatePath: 'https://res2.wx.qq.com/open/js/jweixin-1.4.0.js',
        }).then(() => {
          if (typeof wx === 'undefined') {
            throw new Error('微信 JSSDK 加载失败')
          }
          config()
        })
      } else {
        if (typeof wx === 'undefined') {
          throw new Error('请先引入微信 JSSDK')
        }
        config()
      }
    }
  }

  /**
   * 判断当前客户端版本是否支持指定 JS 接口。
   *
   * @param jsApiList 需要检测的 JS 接口列表
   * @returns 以键值对的形式返回，可用的 `api` 值 `true`，不可用为 `false`
   */
  checkJsApi<T extends WechatJsApi>(jsApiList: T[]): Promise<Record<T, boolean>> {
    return this.invoke('checkJsApi', { jsApiList })
      .then(res => res.checkResult)
  }

  /**
   * 设置分享数据。
   *
   * @param params 分享数据
   */
  updateShareData(params: WechatUpdateShareDataParams): Promise<any> {
    params = {
      ...this.prevShareParams,
      ...params,
    }
    this.prevShareParams = params
    return sequential(
      shareJsApiList.map(
        jsApi => () => this.invoke(jsApi, params),
      ),
    )
  }

  /**
   * 选择图片。
   *
   * @param params 参数
   * @returns 选定照片的本地 ID 列表
   */
  chooseImage(params?: WechatChooseImageParams): Promise<string[]> {
    return this.invoke('chooseImage', params)
      .then(res => res.localIds)
  }

  /**
   * 预览图片。
   *
   * @param params 参数
   */
  previewImage(params: WechatPreviewImageParams): Promise<any> {
    return this.invoke('previewImage', {
      urls: params.urls,
      current: params.current || params.urls[0],
    })
  }

  /**
   * 上传图片。
   *
   * **备注：** 上传图片有效期3天，
   * 可用微信多媒体接口下载图片到自己的服务器，
   * 此处获得的服务器端 ID 即 `media_id`。
   *
   * @param params 参数
   * @returns 图片的服务器端 ID
   */
  uploadImage(params: WechatUploadImageParams): Promise<string> {
    return this.invoke('uploadImage', {
      localId: params.localId,
      isShowProgressTips: params.isShowProgressTips ? 1 : 0,
    }).then(res => res.serverId)
  }

  /**
   * 关闭当前网页窗口。
   */
  closeWindow(): Promise<any> {
    return this.invoke('closeWindow')
  }

  /**
   * 批量隐藏非基础菜单项。
   *
   * @param menuList 要隐藏的非基础菜单项列表
   */
  hideNonBaseMenuItems(menuList: WechatNonBaseMenuItem[]): Promise<any> {
    return this.invoke('hideMenuItems', { menuList })
  }

  /**
   * 批量显示非基础菜单项。
   *
   * @param menuList 要显示的非基础菜单项列表
   */
  showNonBaseMenuItems(menuList: WechatNonBaseMenuItem[]): Promise<any> {
    return this.invoke('showMenuItems', { menuList })
  }

  /**
   * 隐藏所有的非基础菜单项。
   */
  hideAllNonBaseMenuItems(): Promise<any> {
    return this.invoke('hideAllNonBaseMenuItem')
  }

  /**
   * 显示所有的非基础菜单项。
   */
  showAllNonBaseMenuItems(): Promise<any> {
    return this.invoke('showAllNonBaseMenuItem')
  }

  /**
   * 错误处理。
   *
   * @param callback 出错时的回调函数
   */
  onError(callback: WechatErrorCallback) {
    this.bus.on('error', callback)
  }

  /**
   * 调用 JSSDK 的 API 方法。
   *
   * @param jsApi 要调用的 API 名称
   * @param params 传给 API 的参数
   * @returns 调用结果
   */
  invoke(jsApi: WechatJsApi, params: Record<string, any> = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const invoke = () => {
        if (!wx[jsApi]) return reject(`wx.${jsApi} 不可用`)
        wx[jsApi]({
          ...params,
          success: resolve,
          fail: reject,
        })
      }
      if (typeof wx === 'undefined' || !this.ready) {
        this.bus.once('ready', invoke)
      } else {
        invoke()
      }
    })
  }
}

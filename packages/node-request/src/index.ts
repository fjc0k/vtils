import axios, {AxiosInstance, AxiosProxyConfig, AxiosResponse} from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import FormData from 'form-data'
import fs from 'fs'
import http from 'http'
import https from 'https'
import iconv from 'iconv-lite'
import mime from 'mime-types'
// @ts-ignore
import RedisCookieStore from 'tough-cookie-redisstore'
import stream from 'stream'
import {CookieJar} from 'tough-cookie'
import {createURIQuery, Defined, forOwn, ii, isPlainObject, isString} from 'vtils'

export * from 'tough-cookie'

export interface INodeRequestCookieJarOptions {
  /** 是否启用，默认为 `false` */
  enabled: boolean,
  /** 使用自定义的 Jar */
  useCustomJar?: CookieJar,
  /** 使用 Redis 作为 Jar */
  useRedisJar?: {
    /** Redis 实例 */
    redisInstance: any,
    /** 储存 Cookie 的键名 */
    key: string,
  },
}

export interface INodeRequestProxyOptions extends AxiosProxyConfig {
  /** 是否启用，默认为 `false` */
  enabled: boolean,
}

export interface INodeRequestOptions {
  /** Cookie Jar 配置 */
  cookieJar?: INodeRequestCookieJarOptions,
  /** 代理配置 */
  proxy?: INodeRequestProxyOptions,
  /** 超时时间（毫秒） */
  timeout?: number,
  /** 基础地址 */
  baseUrl?: string,
}

export interface INodeRequestRequestFile {
  /** 文件 */
  file: string | stream.Readable,
  /** 选项 */
  options: FormData.AppendOptions,
}

export type INodeRequestResponseType = 'auto' | 'json' | 'text' | 'arraybuffer' | 'stream'

export interface INodeRequestRequestPayload {
  /** 请求地址 */
  url: string,
  /** 请求方式 */
  method: 'GET' | 'POST',
  /** 头部信息 */
  headers?: http.IncomingHttpHeaders,
  /** 查询数据 */
  queryData?: Record<string, any>,
  /** 表单数据 */
  formData?: Record<string, any>,
  /** JSON 数据 */
  jsonData?: Record<string, any>,
  /** 文件数据，可以为文件的绝对路径、文件读取流 */
  fileData?: Record<string, string | stream.Readable | INodeRequestRequestFile>,
  /** 返回数据类型（默认：auto） */
  responseType?: INodeRequestResponseType,
}

export class NodeRequest {
  private agent!: AxiosInstance

  constructor({
    cookieJar = {} as Defined<INodeRequestOptions['cookieJar']>,
    proxy = {} as Defined<INodeRequestOptions['proxy']>,
    timeout = 0,
    baseUrl,
  }: INodeRequestOptions = {}) {
    const requestAgent = axios.create({
      withCredentials: cookieJar.enabled,
      proxy: proxy.enabled ? proxy : undefined,
      baseURL: baseUrl,
      timeout: timeout,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        minVersion: 'TLSv1',
      }),
    })
    if (cookieJar.enabled) {
      axiosCookieJarSupport(requestAgent)
      requestAgent.defaults.jar = cookieJar.useCustomJar
        ? cookieJar.useCustomJar
        : cookieJar.useRedisJar
          ? new CookieJar(
            new RedisCookieStore(
              cookieJar.useRedisJar.key,
              {redis: cookieJar.useRedisJar.redisInstance},
            ),
          )
          : true
    }

    this.agent = requestAgent
  }

  async request<T = any>(payload: INodeRequestRequestPayload): Promise<AxiosResponse<T>> {
    const isGET = payload.method === 'GET'
    const formData = !isGET
      && isPlainObject(payload.fileData)
      && ii(() => {
        const formData = new FormData()
        if (payload.formData) {
          forOwn(payload.formData, (value, key) => {
            if (value != null) {
              formData.append(key, value)
            }
          })
        }
        forOwn(payload.fileData!, (file, key) => {
          let options: FormData.AppendOptions | undefined
          if (isPlainObject(file)) {
            options = (file as Exclude<typeof file, stream.Readable>).options
            file = (file as Exclude<typeof file, stream.Readable>).file
          }
          file = isString(file)
            ? fs.createReadStream(file)
            : file
          formData.append(key, file, options)
        })
        return formData
      })
    const res = await this.agent({
      url: payload.url,
      method: payload.method,
      headers: {
        ...(!payload.jsonData ? {'Content-Type': 'application/x-www-form-urlencoded'} : {}),
        ...(payload.headers || {}),
        ...(!formData ? {} : {
          ...formData.getHeaders(),
          'Content-Length': await ii(() => {
            return new Promise(resolve => {
              formData.getLength(
                (_, length) => resolve(length),
              )
            })
          }),
        }),
      },
      params: payload.queryData,
      data: isGET ? undefined : (
        formData || (
          payload.formData
            ? createURIQuery(payload.formData)
            : payload.jsonData || {}
        )
      ),
      responseType: payload.responseType === 'stream' ? 'stream' : 'arraybuffer',
    })

    // 返回内容处理
    let responseType = payload.responseType
    if (responseType !== 'stream' && responseType !== 'arraybuffer') {
      const resContentType = (
        res.headers
        && res.headers['content-type']
        && mime.contentType(res.headers['content-type'])
      ) || ''
      if (responseType == null || responseType === 'auto') {
        responseType = resContentType.includes('application/json')
          ? 'json'
          : resContentType.includes('charset=')
            ? 'text'
            : 'arraybuffer'
      }
      if (responseType !== 'arraybuffer') {
        if (resContentType) {
          const charsetMatch = resContentType.match(/charset=([^\s;]+)/is)
          const charset = charsetMatch && charsetMatch[1].toLowerCase()
          if (charset) {
            try {
              res.data = iconv.decode(res.data, charset)
            } catch (e) {}
          }
        } else {
          res.data = iconv.decode(res.data, 'utf8')
        }
        if (responseType === 'json') {
          res.data = JSON.parse(res.data)
        }
      }
    }

    return res
  }
}

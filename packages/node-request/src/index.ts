import axios, {AxiosInstance, AxiosProxyConfig, AxiosResponse} from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import FormData from 'form-data'
import fs from 'fs'
import http from 'http'
import https from 'https'
import iconv from 'iconv-lite'
// @ts-ignore
import RedisCookieStore from 'tough-cookie-redisstore'
import stream from 'stream'
import {CookieJar} from 'tough-cookie'
import {createURIQuery, Defined, forOwn, ii, isPlainObject, isString, LiteralUnion} from 'vtils'

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

export type INodeRequestResponseType = 'json' | 'text' | 'arraybuffer' | 'stream'

export type INodeRequestResponseEncoding = LiteralUnion<'437' | '737' | '775' | '808' | '850' | '852' | '855' | '856' | '857' | '858' | '860' | '861' | '862' | '863' | '864' | '865' | '866' | '869' | '874' | '922' | '932' | '936' | '949' | '950' | '1046' | '1124' | '1125' | '1129' | '1133' | '1161' | '1162' | '1163' | '1250' | '1251' | '1252' | '1253' | '1254' | '1255' | '1256' | '1257' | '1258' | '10000' | '10006' | '10007' | '10029' | '10079' | '10081' | '20866' | '21866' | '28591' | '28592' | '28593' | '28594' | '28595' | '28596' | '28597' | '28598' | '28599' | '28600' | '28601' | '28603' | '28604' | '28605' | '28606' | 'utf8' | 'cesu8' | 'unicode11utf8' | 'ucs2' | 'utf16le' | 'binary' | 'base64' | 'hex' | 'utf32le' | 'utf32be' | 'ucs4le' | 'ucs4be' | 'utf32' | 'ucs4' | 'utf16be' | 'utf16' | 'utf7' | 'unicode11utf7' | 'utf7imap' | 'maccenteuro' | 'ibm808' | 'cp808' | 'mik' | 'ascii8bit' | 'usascii' | 'ansix34' | 'ansix341968' | 'ansix341986' | 'csascii' | 'cp367' | 'ibm367' | 'isoir6' | 'iso646us' | 'iso646irv' | 'us' | 'latin1' | 'latin2' | 'latin3' | 'latin4' | 'latin5' | 'latin6' | 'latin7' | 'latin8' | 'latin9' | 'latin10' | 'csisolatin1' | 'csisolatin2' | 'csisolatin3' | 'csisolatin4' | 'csisolatincyrillic' | 'csisolatinarabic' | 'csisolatingreek' | 'csisolatinhebrew' | 'csisolatin5' | 'csisolatin6' | 'l1' | 'l2' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7' | 'l8' | 'l9' | 'l10' | 'isoir14' | 'isoir57' | 'isoir100' | 'isoir101' | 'isoir109' | 'isoir110' | 'isoir144' | 'isoir127' | 'isoir126' | 'isoir138' | 'isoir148' | 'isoir157' | 'isoir166' | 'isoir179' | 'isoir199' | 'isoir203' | 'isoir226' | 'cp819' | 'ibm819' | 'cyrillic' | 'arabic' | 'arabic8' | 'ecma114' | 'asmo708' | 'greek' | 'greek8' | 'ecma118' | 'elot928' | 'hebrew' | 'hebrew8' | 'turkish' | 'turkish8' | 'thai' | 'thai8' | 'celtic' | 'celtic8' | 'isoceltic' | 'tis6200' | 'tis62025291' | 'tis62025330' | 'cspc8codepage437' | 'cspc775baltic' | 'cspc850multilingual' | 'cspcp852' | 'cspc862latinhebrew' | 'cpgr' | 'msee' | 'mscyrl' | 'msansi' | 'msgreek' | 'msturk' | 'mshebr' | 'msarab' | 'winbaltrim' | 'cp20866' | 'ibm878' | 'cskoi8r' | 'cp21866' | 'ibm1168' | 'strk10482002' | 'tcvn5712' | 'tcvn57121' | 'gb198880' | 'cn' | 'csiso14jisc6220ro' | 'jisc62201969ro' | 'jp' | 'cshproman8' | 'r8' | 'roman8' | 'xroman8' | 'ibm1051' | 'mac' | 'csmacintosh' | 'windows874' | 'win874' | 'cp874' | 'windows1250' | 'win1250' | 'cp1250' | 'windows1251' | 'win1251' | 'cp1251' | 'windows1252' | 'win1252' | 'cp1252' | 'windows1253' | 'win1253' | 'cp1253' | 'windows1254' | 'win1254' | 'cp1254' | 'windows1255' | 'win1255' | 'cp1255' | 'windows1256' | 'win1256' | 'cp1256' | 'windows1257' | 'win1257' | 'cp1257' | 'windows1258' | 'win1258' | 'cp1258' | 'iso88591' | 'cp28591' | 'iso88592' | 'cp28592' | 'iso88593' | 'cp28593' | 'iso88594' | 'cp28594' | 'iso88595' | 'cp28595' | 'iso88596' | 'cp28596' | 'iso88597' | 'cp28597' | 'iso88598' | 'cp28598' | 'iso88599' | 'cp28599' | 'iso885910' | 'cp28600' | 'iso885911' | 'cp28601' | 'iso885913' | 'cp28603' | 'iso885914' | 'cp28604' | 'iso885915' | 'cp28605' | 'iso885916' | 'cp28606' | 'cp437' | 'ibm437' | 'csibm437' | 'cp737' | 'ibm737' | 'csibm737' | 'cp775' | 'ibm775' | 'csibm775' | 'cp850' | 'ibm850' | 'csibm850' | 'cp852' | 'ibm852' | 'csibm852' | 'cp855' | 'ibm855' | 'csibm855' | 'cp856' | 'ibm856' | 'csibm856' | 'cp857' | 'ibm857' | 'csibm857' | 'cp858' | 'ibm858' | 'csibm858' | 'cp860' | 'ibm860' | 'csibm860' | 'cp861' | 'ibm861' | 'csibm861' | 'cp862' | 'ibm862' | 'csibm862' | 'cp863' | 'ibm863' | 'csibm863' | 'cp864' | 'ibm864' | 'csibm864' | 'cp865' | 'ibm865' | 'csibm865' | 'cp866' | 'ibm866' | 'csibm866' | 'cp869' | 'ibm869' | 'csibm869' | 'cp922' | 'ibm922' | 'csibm922' | 'cp1046' | 'ibm1046' | 'csibm1046' | 'cp1124' | 'ibm1124' | 'csibm1124' | 'cp1125' | 'ibm1125' | 'csibm1125' | 'cp1129' | 'ibm1129' | 'csibm1129' | 'cp1133' | 'ibm1133' | 'csibm1133' | 'cp1161' | 'ibm1161' | 'csibm1161' | 'cp1162' | 'ibm1162' | 'csibm1162' | 'cp1163' | 'ibm1163' | 'csibm1163' | 'maccroatian' | 'maccyrillic' | 'macgreek' | 'maciceland' | 'macroman' | 'macromania' | 'macthai' | 'macturkish' | 'macukraine' | 'koi8r' | 'koi8u' | 'koi8ru' | 'koi8t' | 'armscii8' | 'rk1048' | 'tcvn' | 'georgianacademy' | 'georgianps' | 'pt154' | 'viscii' | 'iso646cn' | 'iso646jp' | 'hproman8' | 'macintosh' | 'ascii' | 'tis620' | 'shiftjis' | 'csshiftjis' | 'mskanji' | 'sjis' | 'windows31j' | 'ms31j' | 'xsjis' | 'windows932' | 'ms932' | 'cp932' | 'eucjp' | 'gb2312' | 'gb231280' | 'gb23121980' | 'csgb2312' | 'csiso58gb231280' | 'euccn' | 'windows936' | 'ms936' | 'cp936' | 'gbk' | 'xgbk' | 'isoir58' | 'gb18030' | 'chinese' | 'windows949' | 'ms949' | 'cp949' | 'cseuckr' | 'csksc56011987' | 'euckr' | 'isoir149' | 'korean' | 'ksc56011987' | 'ksc56011989' | 'ksc5601' | 'windows950' | 'ms950' | 'cp950' | 'big5' | 'big5hkscs' | 'cnbig5' | 'csbig5' | 'xxbig5', string>

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
  /** 返回数据类型（默认：json） */
  responseType?: INodeRequestResponseType,
  /** 返回数据编码（默认：utf8） */
  responseEncoding?: INodeRequestResponseEncoding,
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
    const shouldDecode = payload.responseEncoding
      && payload.responseType !== 'arraybuffer'
      && payload.responseType !== 'stream'
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
      responseType: shouldDecode ? 'arraybuffer' : payload.responseType,
    })
    if (shouldDecode) {
      try {
        res.data = iconv.decode(res.data, payload.responseEncoding!)
      } catch (e) {}
      if (payload.responseType !== 'text') {
        try {
          res.data = JSON.parse(res.data)
        } catch (e) {}
      }
    }
    return res
  }
}

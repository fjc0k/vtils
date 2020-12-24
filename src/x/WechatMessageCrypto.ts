import crypto from 'crypto'
import { parseXml } from './parseXml'
import { sha1 } from './sha1'

export interface WechatMessageCryptoOptions {
  /** 公众号/第三方平台的 APPID */
  appId: string

  /** 消息校验口令 */
  token: string

  /** 消息加解密密钥 */
  encodingAESKey: string
}

export interface WechatMessageCryptoSignOptions {
  /** Unix 时间戳 */
  timestamp: number

  /** 随机字符串 */
  nonceStr: string

  /** 加密后的消息 */
  encryptedMsg: string
}

export interface WechatMessageCryptoSignEncryptedMsgResult {
  /** Unix 时间戳 */
  timestamp: number

  /** 随机字符串 */
  nonceStr: string

  /** 签名 */
  signature: string
}

/**
 * 微信公众号消息加解密。
 */
export class WechatMessageCrypto {
  private aesKey!: Buffer

  private iv!: Buffer

  constructor(private options: WechatMessageCryptoOptions) {
    this.aesKey = Buffer.from(`${options.encodingAESKey}=`, 'base64')
    this.iv = this.aesKey.slice(0, 16)
  }

  /**
   * 加密原始消息。
   *
   * @param msg 原始消息
   */
  encryptMsg(msg: string): string {
    const randomBytes = crypto.randomBytes(16)

    const msgLenBuf = Buffer.alloc(4)
    const offset = 0
    msgLenBuf.writeUInt32BE(Buffer.byteLength(msg), offset)

    const msgBuf = Buffer.from(msg)
    const appIdBuf = Buffer.from(this.options.appId)

    let totalBuf = Buffer.concat([randomBytes, msgLenBuf, msgBuf, appIdBuf])

    const cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv)
    cipher.setAutoPadding(false)
    totalBuf = this.PKCS7Encode(totalBuf)
    const encryptedBuf = Buffer.concat([
      cipher.update(totalBuf),
      cipher.final(),
    ])

    return encryptedBuf.toString('base64')
  }

  /**
   * 签名。
   *
   * @param options 选项
   */
  sign(options: WechatMessageCryptoSignOptions): string {
    return sha1(
      [
        this.options.token,
        options.timestamp,
        options.nonceStr,
        options.encryptedMsg,
      ]
        .sort((a, b) => {
          a = a.toString()
          b = b.toString()
          return a > b ? 1 : a < b ? -1 : 0
        })
        .join(''),
    )
  }

  /**
   * 签名加密后的消息。
   *
   * @param encryptedMsg 加密后的消息
   */
  signEncryptedMsg(
    encryptedMsg: string,
  ): WechatMessageCryptoSignEncryptedMsgResult {
    const timestamp = Math.round(Date.now() / 1000)
    const nonceStr = timestamp.toString(36)
    const signature = this.sign({ timestamp, nonceStr, encryptedMsg })
    return { timestamp, nonceStr, signature }
  }

  /**
   * 签名加密后的消息并返回封装好的 XML。
   *
   * @param encryptedMsg 加密后的消息
   */
  signEncryptedMsgAsXml(encryptedMsg: string): string {
    const { timestamp, nonceStr, signature } = this.signEncryptedMsg(
      encryptedMsg,
    )
    return (
      `<xml>` +
      `<Encrypt><![CDATA[${encryptedMsg}]]></Encrypt>` +
      `<MsgSignature><![CDATA[${signature}]]></MsgSignature>` +
      `<TimeStamp>${timestamp}</TimeStamp>` +
      `<Nonce><![CDATA[${nonceStr}]]></Nonce>` +
      `</xml>`
    )
  }

  /**
   * 检查签名是否正确。
   *
   * @param signature 要验证的签名
   * @param payload 载荷
   */
  checkSignature(
    signature: string,
    payload: WechatMessageCryptoSignOptions,
  ): boolean {
    return this.sign(payload) === signature
  }

  /**
   * 解密加密后的消息。
   *
   * @param encryptedMsg 加密后的消息
   */
  decryptEncryptedMsg(encryptedMsg: string): string {
    const encryptedMsgBuf = Buffer.from(encryptedMsg, 'base64')

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.aesKey,
      this.iv,
    )
    decipher.setAutoPadding(false)
    let decryptedBuf = Buffer.concat([
      decipher.update(encryptedMsgBuf),
      decipher.final(),
    ])

    decryptedBuf = this.PKCS7Decode(decryptedBuf)

    const msgSize = decryptedBuf.readUInt32BE(16)
    const msgBufStartPos = 16 + 4
    const msgBufEndPos = msgBufStartPos + msgSize

    const msgBuf = decryptedBuf.slice(msgBufStartPos, msgBufEndPos)

    return msgBuf.toString()
  }

  /**
   * 解密加密后的消息并作为 XML 解码返回。
   *
   * @param encryptedMsg 加密后的消息
   */
  decryptEncryptedMsgAsXml<T>(encryptedMsg: string): T {
    return parseXml<{ xml: T }>(this.decryptEncryptedMsg(encryptedMsg)).xml
  }

  private PKCS7Decode(buf: Buffer) {
    const padSize = buf[buf.length - 1]
    return buf.slice(0, buf.length - padSize)
  }

  private PKCS7Encode(buf: Buffer) {
    const padSize = 32 - (buf.length % 32)
    const fillByte = padSize
    const padBuf = Buffer.alloc(padSize, fillByte)
    return Buffer.concat([buf, padBuf])
  }
}

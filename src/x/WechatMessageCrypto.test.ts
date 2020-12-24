import { WechatMessageCrypto } from './WechatMessageCrypto'

jest.mock('crypto', () => ({
  ...(jest.requireActual('crypto') as any),
  randomBytes: () => Buffer.from('123456'),
}))

Object.defineProperty(Date, 'now', {
  value: () => 1608776976262,
})

describe('WechatCrypto', () => {
  test('第三方平台', () => {
    Object.defineProperty(Date, 'now', {
      value: () => 1608776976262,
    })

    const wmc = new WechatMessageCrypto({
      appId: 'wxd4970d77949d0829',
      token: 'Bc-!9n4xnku!_Dx!@BHVk',
      encodingAESKey: 'oMa2AFkWcPLPCsNsHjx9TdrZEPDTLevhXejefjPoQxP',
    })

    const messageEncrypted =
      'BfyISyHfXZ1Y7r4ukwsUMHLxhji9zXHQo/n71zzz6kpJ+wBgzLU5rmtjnyjuRoLfkb1RMXATwyoMPH0WQlZx2//7MWk/JTbU59h1DtabvPRZ16Ue69EpkEJ/OZGwrjoZFdwI8O6Z8IrFLWKdcEOdDVBp8u4eNv9fxQIssoJG2MIaKsV7bQQ+zH0s/2BL09U/C2u+P+D/51qtaHIVip57SDgKtVUa0voscQS4SI6TECpwXZQSBiWjO8awLmLuYiYLjiqgd7jg6lg66da3CbStR85XHrPnoN0QKhRoz8fLBfBmz/HkwMxP6gm7FTp80kQJoXm7byAisqplajpEpqeWinJIcSNacEQ3FxUacAYjzh3TnrcnSLqoMtL5EXKKTPlDpWzPWd0TvXg1I+bvSqfI72RWHq/MjpJzJioiVUHg7WrejSmTPuF0dm263RDCeMDMPvIoZNa8Fpk6Ad6pQg3AssPPmEKgb8F8GpsezgifKAgd5wzFCiu/3IBVPQrRlIznhEB8NPpHCIGLXfnYCiEchAWkbcev/Q1IinG2sBGSruM='
    expect(wmc.decryptEncryptedMsg(messageEncrypted)).toMatchSnapshot()
    expect(wmc.decryptEncryptedMsgAsXml(messageEncrypted)).toMatchSnapshot()

    const notifyEncrypted =
      'JeK+KAvspbZhljTCpWcKFBVOnrZN9ubcB1MFBRJoz4OW5ufJmkGzmSFdrhKYV+sg/tD77/zO/11ZW8o+LXu9LxL3LNKbXybM/nP4s1JAzygyU/J5rVaq3THhHwWQUzrRUMR1FCNInPERdK90rZeVEcjl8Mk96ARtrF1c16hn2XoI/M/QvGAXn6VWy6ERWXxWFW3AhgtfW1EruLz9KreI2gnqCblFVsUl3ea/UsmivlQTWrSMTRuV2Y0F+i63ezdiCivOXKIeQfbSgYovxpmVcuvRgJB4xb9h+9LpZfv/1FYnTCF41XG2ve//cnJvkxAdet280vw7HIm+r+w9IHAsODEfsamnlwq9lyEgxtboTfGH1y/pliRgBjg5nPg5ySod4fJRERs89xgezwbTHbkIhvnOiFGFfwSYhRfkHbuGguBkJgRqStGCOMN0x0AYN8Rncz8AjuDoKSex0QNPUVzMxDa7Foef+3FiCgPjNjfe5Z0/3e2p0VUq+PL511PbXQpOYK35pQPlDZIzL618DJReZlbGxUlqktUjEkqNm0OnJwfUjIf3tPLO3yeV6TUocdisKRwCWT6++n+Xw+4FSC+gepYP8cQKxwteX+0Cj+9hZyXZWumkMBXY02joifRkF6deEbmCPpOUjXUbqp2v9/UCYUvvoiuV0wBOnHHFNmxSZQ6+VHNVetcsy3Ze5ZPRKIRgP8FedVyiXnlGNVt+C4r6tUKW5br36qYPBRXJQ5fOc+sLNvRzBC5Zt5W2PkpOwAwiEJ8HD/IcdpSBWRSLoeaveMEOy6xvp6+vEAy7aeWsIwXbCFJF6dSbgTwnXgcDfTM7lnL0+iDw7CPzcdRYInJYsA=='
    expect(wmc.decryptEncryptedMsg(notifyEncrypted)).toMatchSnapshot()
    expect(wmc.decryptEncryptedMsgAsXml(notifyEncrypted)).toMatchSnapshot()

    const msg = '<xml><ID>2020</ID></xml>'
    expect(wmc.decryptEncryptedMsg(wmc.encryptMsg(msg))).toMatchSnapshot()
    expect(wmc.signEncryptedMsg(wmc.encryptMsg(msg))).toMatchSnapshot()
    expect(wmc.signEncryptedMsgAsXml(wmc.encryptMsg(msg))).toMatchSnapshot()

    const encryptedMsg = wmc.encryptMsg(msg)
    const signedEncryptedMsg = wmc.signEncryptedMsg(encryptedMsg)
    expect(
      wmc.checkSignature(signedEncryptedMsg.signature, {
        encryptedMsg: encryptedMsg,
        nonceStr: signedEncryptedMsg.nonceStr,
        timestamp: signedEncryptedMsg.timestamp,
      }),
    ).toBeTrue()
  })
})

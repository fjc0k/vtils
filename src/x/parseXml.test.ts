import { dedent } from '../utils/index.ts'
import { parseXml } from './parseXml.ts'

describe('parseXml', () => {
  test('表现正常', () => {
    expect(
      parseXml(dedent`
        <xml>
          <ToUserName><![CDATA[toUser]]></ToUserName>
          <FromUserName><![CDATA[fromUser]]></FromUserName>
          <CreateTime>12345678</CreateTime>
          <MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA[你好]]></Content>
        </xml>
      `),
    ).toMatchSnapshot()
  })
})

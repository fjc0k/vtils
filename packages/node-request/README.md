# @vtils/node-request

基于 axios 封装的 node.js 网络请求库。

## 特性

- 仅支持 `GET`、`POST` 请求方式
- 内置 cookie jar 支持
- 内置更易用的文件上传支持
- 更易用的数据提交方式

## 安装

```bash
# yarn
yarn add vtils @vtils/node-request

# or, npm
npm i vtils @vtils/node-request --save
```

## 使用

```ts
import { NodeRequest } from 'node-request'

const nr = new NodeRequest({
  baseUrl: 'https://foo.bar/api',
  cookieJar: {
    enabled: true,
  },
  timeout: 6000,
})

async function getUserInfo(userId: number) {
  return nr.request<{ id: number, name: string, avatar: string }>({
    url: '/getUserInfo',
    method: 'POST',
    jsonData: { id: userId },
  }).then(res => res.data)
}

async function updateUserAvatar(userId: number, avatarPath: string) {
  return nr.request({
    url: '/updateUserAvatar',
    method: 'POST',
    formData: { id: userId },
    fileData: { avatar: avatarPath },
  }).then(res => res.data)
}
```

## 许可

MIT ©️ Jay Fong

import * as lodash from 'lodash-es'
import * as vtils from './index'

describe('index', () => {
  test('应该导出 lodash-es', () => {
    expect([...Object.keys(vtils), 'default']).toIncludeAllMembers(
      Object.keys(lodash),
    )
  })
})

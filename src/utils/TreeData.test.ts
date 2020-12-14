import { range } from 'lodash-uni'
import { TreeData } from './TreeData'

describe('TreeData', () => {
  const data = range(0, 10).map(i => ({
    id: `${i}`,
    children: range(0, 10).map(i2 => ({
      id: `${i}.${i2}`,
      children: [],
    })),
  }))

  test('export', () => {
    expect(new TreeData(data).export()).toEqual(data)
  })

  describe('traverse', () => {
    test('basic', () => {
      const ids: string[] = []
      new TreeData(data).traverse(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('traverseDFS', () => {
      const ids: string[] = []
      new TreeData(data).traverseDFS(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('traverseBFS', () => {
      const ids: string[] = []
      new TreeData(data).traverseBFS(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('searchMethod = DFS', () => {
      const ids: string[] = []
      new TreeData(data, {
        searchStrategy: 'DFS',
      }).traverse(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('searchMethod = BFS', () => {
      const ids: string[] = []
      new TreeData(data, {
        searchStrategy: 'BFS',
      }).traverse(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('payload.removeNode', () => {
      const ids: string[] = []
      new TreeData(data).traverse([
        payload => {
          if (payload.node.id.endsWith('.3')) {
            payload.removeNode()
          }
        },
        payload => {
          ids.push(payload.node.id)
        },
      ])
      expect(ids).toMatchSnapshot()
    })
  })

  test('setNodeProps', () => {
    expect(
      new TreeData(data)
        .setNodeProps({
          value: _ => _.node.id,
          id2: _ => `${_.node.id}[2]`,
        })
        .export(),
    ).toMatchSnapshot()
  })

  test('omitNodeProps', () => {
    expect(new TreeData(data).omitNodeProps(['id']).export()).toMatchSnapshot()
  })

  test('pickNodeProps', () => {
    expect(new TreeData(data).pickNodeProps(['id']).export()).toMatchSnapshot()
  })

  test('setDepth', () => {
    expect(new TreeData(data).setDepth(0).export()).toMatchSnapshot()
  })

  test('findNode', () => {
    expect(
      new TreeData(data).findNode(_ => _.node.id === '1.1'),
    ).toMatchSnapshot()
    expect(
      new TreeData(data).findNode(_ => _.node.id === '1.1111'),
    ).toMatchSnapshot()
  })

  test('findNodes', () => {
    expect(
      new TreeData(data).findNodes(_ => _.node.id.startsWith('1.')),
    ).toMatchSnapshot()
    expect(
      new TreeData(data).findNodes(_ => _.node.id.startsWith('1.3333')),
    ).toMatchSnapshot()
  })

  test('findNodePath', () => {
    expect(
      new TreeData(data).findNodePath(_ => _.node.id === '1.1'),
    ).toMatchSnapshot()
    expect(
      new TreeData(data).findNodePath(_ => _.node.id === '1.1111'),
    ).toMatchSnapshot()
  })

  test('findNodePaths', () => {
    expect(
      new TreeData(data).findNodePaths(_ => _.node.id === '1.1'),
    ).toMatchSnapshot()
    expect(
      new TreeData(data).findNodePaths(_ => _.node.id === '1.1111'),
    ).toMatchSnapshot()
  })

  test('removeNode', () => {
    const tree = new TreeData(data)
    const removed = tree.removeNode(_ => _.node.id.startsWith('1.'))
    expect(removed).toMatchSnapshot()
    expect(tree.export()).toMatchSnapshot()
  })

  test('removeNodes', () => {
    const tree = new TreeData(data)
    const removed = tree.removeNodes(_ => _.node.id.startsWith('1.'))
    expect(removed).toMatchSnapshot()
    expect(tree.export()).toMatchSnapshot()
  })

  test('count', () => {
    expect(new TreeData(data).count()).toMatchSnapshot()
    expect(
      new TreeData(data).count(_ => _.node.id.startsWith('1.')),
    ).toMatchSnapshot()
  })

  test('clone', () => {
    expect(new TreeData(data).clone().export()).toMatchSnapshot()
  })

  test('fromList', () => {
    expect(
      TreeData.fromList(
        [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 11, pid: 1 },
          { id: 4 },
          { id: 12, pid: 1 },
          { id: 111, pid: 11 },
          { id: 42, pid: 4 },
        ],
        'id',
        'pid',
      )
        .setNodeProps({
          name: _ => `${_.depth}. ${_.node.id}`,
        })
        .export(),
    ).toMatchSnapshot()
  })

  test('综合', () => {
    const names: string[] = []
    const names2: string[] = []
    expect(
      new TreeData(data)
        .setNodeProps({
          name: _ => `name${_.node.id}`,
          gender: () => `male`,
        })
        .omitNodeProps(['gender'])
        .traverse(({ node }) => {
          names.push(node.name)
        })
        .traverse(({ node }) => {
          names2.push(node.name)
        }, 'BFS')
        .export(),
    ).toMatchSnapshot()
    expect(names).toMatchSnapshot()
    expect(names2).toMatchSnapshot()
  })
})

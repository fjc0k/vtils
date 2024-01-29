import { range } from 'lodash-uni'
import { TreeData } from './TreeData.ts'

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

  test('index', () => {
    expect(
      new TreeData(data)
        .setNodeProps({
          index: _ => _.index,
        })
        .export(),
    ).toMatchSnapshot()
  })

  test('filter', () => {
    expect(
      new TreeData(data).filter(_ => _.node.id.endsWith('.2')).export(),
    ).toMatchSnapshot()
    expect(
      new TreeData(data)
        .filter(_ => _.node.id.endsWith('.2'))
        .filter(_ => _.node.id.startsWith('1.'))
        .export(),
    ).toMatchSnapshot()
    expect(
      new TreeData(data)
        .filter(_ => _.node.id.endsWith('.2') || _.node.id === '1')
        .export(),
    ).toMatchSnapshot()
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

  test('findNodeAll', () => {
    expect(
      new TreeData(data).findNodeAll(_ => _.node.id.startsWith('1.')),
    ).toMatchSnapshot()
    expect(
      new TreeData(data).findNodeAll(_ => _.node.id.startsWith('1.3333')),
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

  test('findNodePathAll', () => {
    expect(
      new TreeData(data).findNodePathAll(_ => _.node.id === '1.1'),
    ).toMatchSnapshot()
    expect(
      new TreeData(data).findNodePathAll(_ => _.node.id === '1.1111'),
    ).toMatchSnapshot()
  })

  test('removeNode', () => {
    const tree = new TreeData(data)
    const removed = tree.removeNode(_ => _.node.id.startsWith('1.'))
    expect(removed).toMatchSnapshot()
    expect(tree.export()).toMatchSnapshot()
  })

  test('removeNodeAll', () => {
    const tree = new TreeData(data)
    const removed = tree.removeNodeAll(_ => _.node.id.startsWith('1.'))
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

  test('exportList', () => {
    expect(new TreeData(data).exportList()).toMatchSnapshot()
  })

  test('fromList', () => {
    expect(
      TreeData.fromList(
        [
          { id: 1 },
          { id: 2 },
          { id: 3, pid: -1 },
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

  test('traverseNode', () => {
    expect(
      new TreeData(data)
        .traverseNode(
          _ => _.node.id === '2',
          _ => (_.node.id += '_checked'),
        )
        .export(),
    ).toMatchSnapshot()
  })

  test('traverseNodeDFS', () => {
    expect(
      new TreeData(data)
        .traverseNodeDFS(
          _ => _.node.id === '2',
          _ => (_.node.id += '_checked'),
        )
        .export(),
    ).toMatchSnapshot()
  })

  test('traverseNodeBFS', () => {
    expect(
      new TreeData(data)
        .traverseNodeBFS(
          _ => _.node.id === '2',
          _ => (_.node.id += '_checked'),
        )
        .export(),
    ).toMatchSnapshot()
  })

  test('cloneIgnore', () => {
    const x = { x: 1 }
    expect(
      new TreeData(
        [
          {
            x,
          },
        ],
        {
          cloneIgnore: value =>
            typeof value === 'object' && (value as any).x === 1,
        },
      ).export()[0].x,
    ).toBe(x)
  })

  // test('大数据', () => {
  //   const data = range(0, 1000).map(i => ({
  //     id: `${i}`,
  //     children: range(0, 1000).map(i2 => ({
  //       id: `${i}.${i2}`,
  //       children: [],
  //     })),
  //   }))
  //   const startTime = Date.now()
  //   new TreeData(data).traverse(_ => {
  //     // ...
  //   })
  //   const endTime = Date.now()
  //   console.log(endTime - startTime)
  //   expect(1).toBe(1)
  // })

  // test('深嵌套', () => {
  //   let i = 0
  //   TreeData.fromList(
  //     range(0, 10000).map(i => ({ id: i, pid: i === 0 ? undefined : i - 1 })),
  //     'id',
  //     'pid',
  //   ).traverse(() => i++)
  //   expect(i).toMatchSnapshot()
  // })

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

import {assign} from './assign'
import {jestExpectEqual} from './enhanceJest'

describe('有原生 Object.assign', () => {
  test('表现正常', () => {
    const obj = {}
    const assignedObj = assign(obj, {x: 1}, {1: 2})

    jestExpectEqual(
      assignedObj,
      obj,
    )

    jestExpectEqual(
      assignedObj,
      {x: 1, 1: 2},
    )
  })
})

describe('无原生 Object.assign', () => {
  test('表现正常', () => {
    const obj = {}

    const originalObjectAssign = Object.assign
    Object.assign = null as any
    const assignedObj = assign(obj, {x: 1}, {1: 2})
    Object.assign = originalObjectAssign

    jestExpectEqual(
      assignedObj,
      obj,
    )

    jestExpectEqual(
      assignedObj,
      {x: 1, 1: 2},
    )
  })
})

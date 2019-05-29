import { jestExpectEqual } from './enhanceJest'
import { round, roundDown, roundUp } from './round'

test('round', () => {
  jestExpectEqual(round(0.129, 3), 0.129)
  jestExpectEqual(round(0.129, 2), 0.13)
  jestExpectEqual(round(0.129, 1), 0.1)
  jestExpectEqual(round(1.005, 2), 1.01)
  jestExpectEqual(round(1.005, 0), 1)
  jestExpectEqual(round(111.1, -2), 100)
  jestExpectEqual(round(-0.375, 2), -0.38)
  jestExpectEqual(Number.isNaN(round(10000000000000, 8)), false)
  jestExpectEqual(round(0.37542323423423432432432432432, 8), 0.37542323)
})

test('roundUp', () => {
  jestExpectEqual(roundUp(0.111, 3), 0.111)
  jestExpectEqual(roundUp(0.111, 2), 0.12)
  jestExpectEqual(roundUp(0.111, 1), 0.2)
  jestExpectEqual(roundUp(1.004, 2), 1.01)
  jestExpectEqual(roundUp(1.111, 0), 2)
  jestExpectEqual(roundUp(111.1, -2), 200)
  jestExpectEqual(roundUp(-0.375, 2), -0.37)
})

test('roundDown', () => {
  jestExpectEqual(roundDown(0.666, 3), 0.666)
  jestExpectEqual(roundDown(0.666, 2), 0.66)
  jestExpectEqual(roundDown(0.666, 1), 0.6)
  jestExpectEqual(roundDown(1.006, 2), 1.0)
  jestExpectEqual(roundDown(1.006, 0), 1)
  jestExpectEqual(roundDown(111.6, -2), 100)
  jestExpectEqual(roundDown(-0.375, 2), -0.38)
})

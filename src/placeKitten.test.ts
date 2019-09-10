import {jestExpectEqual} from './enhanceJest'
import {placeKitten} from './placeKitten'

test('表现正常', () => {
  jestExpectEqual(
    placeKitten(200),
    'https://placekitten.com/200/200',
  )

  jestExpectEqual(
    placeKitten(200, 500),
    'https://placekitten.com/200/500',
  )
})

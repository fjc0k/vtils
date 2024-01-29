import { runBenchmark } from '../dev/index.ts'
import { rot13 } from './rot13.ts'

function rot13Arr(str: string) {
  const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
  const index = (x: string) => input.indexOf(x)
  const translate = (x: string) => (index(x) > -1 ? output[index(x)] : x)
  return str.split('').map(translate).join('')
}

function rot13Re(str: string) {
  return str.replace(/[a-z]/gi, char => {
    return String.fromCharCode(
      char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13),
    )
  })
}

const str = `ROT13 is its own inverse. Meaning, to undo ROT13, the same algorithm is applied, so the same action can be used for encoding and decoding.`

runBenchmark({
  ['rot13!fastest']() {
    rot13(str)
  },
  ['rot13Arr']() {
    rot13Arr(str)
  },
  ['rot13Re']() {
    rot13Re(str)
  },
})

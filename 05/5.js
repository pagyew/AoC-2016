const { readFileSync } = require('node:fs')
const { basename } = require('node:path')
const crypto = require('node:crypto')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  let j = 0
  let ans = Array(8).fill('')
  let hash = ''

  for (let i = 0; i < 8; i++) {
    do {
      hash = crypto.createHash('md5').update(input + j++).digest('hex')
    } while (!hash.startsWith('00000') || (part2 && (!Number.isFinite(+hash[5]) || ans[+hash[5]] !== '')))

    const [a, b] = hash.slice(5, 7).split('')

    ans[part2 ? +a : i] = part2 ? b : a
  }

  console.log(ans.join(''));
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

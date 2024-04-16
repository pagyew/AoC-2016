const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const process = (a) => a + 0 + a.split('').reverse().map(x => +(!(+x))).join('')
const checksum = (input) => {
  let i = -2
  let res = []

  while ((i += 2) < input.length) {
    res.push(+(input[i] === input[i + 1]))
  }

  return res.length % 2 ? res.join('') : checksum(res.join(''))
}

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const len = part2 ? 35651584 : 272
  let initial = input
  let ans = 0

  while (initial.length < len) {
    initial = process(initial)
  }

  ans = checksum(initial.slice(0, len))

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

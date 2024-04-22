const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = +input
  const base = part2 ? 3 : 2
  const log = +(Math.log(n) / Math.log(base)).toFixed(5)
  const l = base ** Math.floor(log)
  const h = base ** Math.ceil(log)

  let ans = part2
    ? n < (h + l) / 2 ? n - l : n + n - h
    : n + n - l - l + 1

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

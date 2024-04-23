const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = input.length
  const list = input.map(l => l.split('-').map(Number)).sort((a, b) => a[0] - b[0])
  let allowed = 0
  let ans = 0

  for (let [from, to] of list) {
    if (from <= allowed) allowed = Math.max(allowed, to + 1)
    else if (part2) (ans += from - allowed, allowed = to + 1)
    else break
  }

  ans = part2 ? ans : allowed

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = input.length
  const instructions = input.map(line => line.match(/(cpy|inc|dec|jnz) ([\w\d]+) ?(-?[\w\d]+)?/).slice(1, 4))
  const map = { a: 0, b: 0, c: +part2, d: 0 }
  let ans = 0

  for (let i = 0; i < n; i++) {
    const [action, x, y] = instructions[i]

    if (action === 'cpy') map[y] = map[x] ?? +x
    else if (action === 'inc') map[x]++
    else if (action === 'dec') map[x]--
    else if (map[x] ?? +x) i += +y - 1
  }

  ans = map.a

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

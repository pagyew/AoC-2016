const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const row = `.${input}.`.split('')
  const n = row.length
  let m = part2 ? 400_000 : 40
  let ans = 0

  while (m--) {
    ans += row.reduce((a, b) => a + (b === '.'), 0) - 2

    let l = row[0]
    let c = row[1]
    let r = row[2]

    for (let i = 1; i < n - 1; i++) {
      row[i] = l !== r && (l === c || r === c) ? '^' : '.'

      l = c
      c = r
      r = row[i + 2]
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

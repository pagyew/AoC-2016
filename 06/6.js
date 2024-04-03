const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
  
  const lines = input.split('\n')
  const n = lines.length
  const m = lines[0].length
  let ans = ''

  const maps = Array(m).fill(null).map(() => ({}))

  for (const line of lines) {
    for (let i = 0; i < m; i++) {
      const c = line[i]
      const map = maps[i]
      
      if (c in map) map[c]++
      else map[c] = 1
    }
  }

  for (const map of maps) {
    ans += Object.entries(map)
      .sort((a, b) => part2 ? a[1] - b[1] : b[1] - a[1])
      [0][0]
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

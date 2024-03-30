const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()


for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const triangles = input
    .split('\n')
    .map(line =>
      line
        .trim()
        .split(/\s+/)
        .map(Number)
    )
  const n = triangles.length
  const c1 = part2 ? 3 : n
  const c2 = part2 ? n : 3
  let ans = 0

  for (let i = 0; i < c1; i++) {
    for (let j = 0; j < c2; j += 3) {
      const [ya, yb, yc] = [[j, j + 1, j + 2], [i, i, i]][+!part2]
      const [xa, xb, xc] = [[j, j + 1, j + 2], [i, i, i]][+part2]
      const a = triangles[ya][xa]
      const b = triangles[yb][xb]
      const c = triangles[yc][xc]

      ans += (a + b > c && b + c > a && c + a > b)
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

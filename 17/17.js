const { readFileSync } = require('node:fs')
const { basename } = require('node:path')
const crypto = require('node:crypto')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = 4
  const dirs = [[-1, 0, 'U'], [1, 0, 'D'], [0, -1, 'L'], [0, 1, 'R']]
  const stack = [[0, 0, '', 0]]
  let ans = ['', 0]

  while (stack.length) {
    const [i, j, path, steps] = stack.pop()

    if (i === n - 1 && j === n - 1) {
      if (
        (part2 && path.length > ans[0].length) ||
        (!part2 && path.length < ans[0].length || !ans[1])
      ) ans = [path, steps]

      continue
    }

    const hash = crypto.createHash('md5').update(input + path).digest('hex')

    for (let k = 0; k < dirs.length; k++) {
      const [di, dj, letter] = dirs[k]
      const door = hash[k]
      const [ni, nj] = [i + di, j + dj]

      if (
        ni >= 0 && ni < n &&
        nj >= 0 && nj < n &&
        door > 'a'
      ) stack.push([ni, nj, path + letter, steps + 1])
    }
  }

  console.log(part2 ? ans[1] : ans[0])
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

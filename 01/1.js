const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const instructions = input.split(', ')
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const visited = new Set(['0,0'])
  let dir = 0
  let curr = [0, 0]
  let ans = 0

  for (let instr of instructions) {
    const d = instr[0] === 'L' ? -1 : 1
    let n = parseInt(instr.slice(1))

    dir = (dir + d + 4) % 4

    const dx = dirs[dir][0]
    const dy = dirs[dir][1]

    let twice

    while (n--) {
      curr[0] += dx
      curr[1] += dy

      const key = curr.join()

      if (part2) {
        if (visited.has(key)) {
          twice = curr
          break
        }
      }

      visited.add(key)
    }

    if (twice) {
      curr = twice
      break
    }
  }

  ans = Math.abs(curr[0]) + Math.abs(curr[1])

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

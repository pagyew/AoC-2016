const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const instructions = input.split('\n').map(line => line.split(''))
  const dirs = {
    R: [0, 1],
    D: [1, 0],
    L: [0, -1],
    U: [-1, 0]
  }
  const matrix = part2
    ? ['__1__', '_234_', '56789', '_ABC_', '__D__']
    : ['123', '456', '789']
  const n = part2 ? 4 : 2
  let curr = part2 ? [2, 0] : [1, 1]
  let ans = ''

  instructions.forEach(instruction => {
    for (const dir of instruction) {
      const [dy, dx] = dirs[dir]
      const newY = curr[0] + dy
      const newX = curr[1] + dx

      if (newY < 0 || newY > n || newX < 0 || newX > n) continue
      if (matrix[newY][newX] !== '_') curr = [newY, newX]
    }

    ans += matrix[curr[0]][curr[1]]
  })

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

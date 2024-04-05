const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = input.length
  let ans = 0

  function solve(str) {
    let len = 0

    while (str.indexOf('(') !== -1) {
      const open = str.indexOf('(')
      const close = str.indexOf(')', open)
      const [shift, count] = str.slice(open + 1, close).split('x')
      const start = close + 1
      const end = start + +shift
      const solved = part2 ? solve(str.slice(start, end)) : +shift

      len += open + solved * +count
      str = str.slice(end)
    }

    return len += str.length
  }

  ans = solve(input)

  console.log(ans)
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

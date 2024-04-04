const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false,true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
  
  const n = input.length
  let ans = 0

  for (const line of input) {
    const matches = line.match(
      part2
        ? /(\w)((?!\1)\w)\1\w*(\[|\])\w*((\[\w*\]|\]\w*\[)\w*)*\w*\2\1\2/g
        : /\[?\w*(\w)((?!\1)\w)\2\1\w*\]?/g
    )

    ans += matches && (part2 || matches.every(match => match[0] !== '['))
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

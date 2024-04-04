const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
  
  const n = input.length
  const [N, M] = [50, 6]
  const display = Array(M).fill(null).map(() => Array(N).fill('.'))
  let ans = 0
  
  for (const line of input) {
    const [_, rect, w, h, rotate, xy, d, c] = line.match(
      /(?:(rect) (\d+)x(\d+))|(?:(rotate) (?:column|row) (x|y)=(\d+) by (\d+))/
    )

    if (rect) {
      for (let i = 0; i < +h; i++) {
        for (let j = 0; j < +w; j++) {
          display[i][j] = '#'
        }
      }
    }

    if (rotate) {
      const Y = xy === 'y'
      const shift = +c % (Y ? N : M)
      let arr = Y
        ? display[+d]
        : display.map(row => row[+d])
      
      arr = arr.slice(-shift).concat(arr.slice(0, -shift))
      
      Y ? display[+d] = arr
        : display.forEach((row, i) => row[+d] = arr[i])
    }
  }
  
  ans = display.reduce((c, r) => c + r.reduce((a, b) => a + (b === '#'), 0), 0);
  
  !part2 ? console.log(ans)
    : console.log(display.map(row => row.join('')).join('\n'))
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

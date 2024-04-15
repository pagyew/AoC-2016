const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

const gcd = (a, b) => a ? gcd(b % a, a) : b
const lcm = (a, b) => a * b / gcd(a, b)
const cycle = (discs) => discs.map(([k]) => k).reduce(lcm)
const inc = (disc) => disc[1] = (disc[1] + 1) % disc[0]
const check = (disc, i) => disc[1] === (disc[0] - i) % disc[0]
const parse = (line) => line.match(/Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./).slice(2).map(Number)

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  let discs = input.map(parse)
  if (part2) discs.push([11, 0])
  const fullCyrcle = cycle(discs)
  let ans = -1

  while (ans++ < fullCyrcle && !discs.every(check)) {
    discs.forEach(inc)
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

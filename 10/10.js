const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = input.length
  const [X, Y] = [17, 61]
  const bots = Array(300).fill(null).map(() => [Infinity, 0])
  const outputs = Array(300).fill(0)
  const instructions = Array(300).fill(null)
  let ans = 0

  function setBotValue(bot, value) {
    const [low, high] = bots[bot]

    if (value > high) bots[bot][1] = value
    if (value < low) bots[bot][0] = value
  }

  for (let line of input) {
    const match1 = line.match(/value (\d+) goes to bot (\d+)/)
    const match2 = line.match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/)

    if (match1) setBotValue(match1[2], +match1[1])
    else instructions[match2[1]] = [[match2[2], +match2[3]], [match2[4], +match2[5]]]
  }

  const startIndex = bots.findIndex(([l, h]) => h && l !== h)
  const stack = [startIndex]

  while (stack.length) {
    const bot = stack.pop()
    const [low, high] = bots[bot]

    if (low === high) continue

    const [[lowType, lowIdx], [highType, highIdx]] = instructions[bot]

    if (lowType === 'bot') {
      setBotValue(lowIdx, low)
      stack.push(lowIdx)
    } else outputs[lowIdx] = low

    if (highType === 'bot') {
      setBotValue(highIdx, high)
      stack.push(highIdx)
    } else outputs[highIdx] = high
  }

  ans = part2
    ? outputs[0] * outputs[1] * outputs[2]
    : bots.findIndex(([l, h]) => l === X && h === Y)

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

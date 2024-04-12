const { readFileSync } = require('node:fs')
const { basename } = require('node:path')
const crypto = require('node:crypto')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const triplets = {}
  let fivelets = new Set()
  let ans = 0
  let i = -1

  while (fivelets.size < 64) {
    let hash = crypto.createHash('md5').update(input + ++i).digest('hex')
    let iterations = 2016

    while (part2 && iterations--) {
      hash = crypto.createHash('md5').update(hash).digest('hex')
    }

    const triplet = hash.match(/(.)\1\1/)
    const fivelet = hash.match(/(.)\1\1\1\1/)

    if (fivelet) {
      const [_, fivele] = fivelet
      const indexs = triplets[fivele].filter(j => i - 1000 < j)
      indexs.forEach(index => fivelets.add(index))
    }

    if (triplet) {
      const [_, triple] = triplet
      if (triple in triplets) triplets[triple].push(i)
      else triplets[triple] = [i]
    }
  }

  ans = [...fivelets].sort((a, b) => a - b)[63];

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

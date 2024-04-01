const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

const n = input.length

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const rooms = input.split('\n')
  let ans = 0

  function unpack(room) {
    const [_, letters, id, checksum] = room.match(/([\w-]+)-(\d+)\[(\w+)\]$/i)
    return [letters.replaceAll('-', ''), +id, checksum]
  }

  function calcSum(letters) {
    const map = {}

    for (const letter of letters) {
      map[letter] = (map[letter] || 0) + 1
    }

    return Object.entries(map)
      .sort((a, b) => (b[1] - a[1]) ? b[1] - a[1] : a[0].localeCompare(b[0]))
      .slice(0, 5)
      .map(([letter]) => letter)
      .join('')
  }

  function encrypt(letters, id) {
    const A = 'a'.charCodeAt(0)
    const Z = 'z'.charCodeAt(0)
    const shift = id % 26

    return letters
      .split('')
      .map(letter =>
        (code = letter.charCodeAt(0) + shift, String.fromCharCode(code > Z ? code % Z + A - 1 : code))
      ).join('')
  }

  for (const room of rooms) {
    const [letters, id, checksum] = unpack(room)

    if (part2 && encrypt(letters, id).includes('north')) {
      ans = id
      break
    } else if (calcSum(letters) === checksum) {
      ans += id
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')
const reverseRotationIndexs = [7, 0, 4, 1, 5, 2, 6, 3]
const dirs = { 'left': -1, 'right': 1 }

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function swapByLetter(arr, a, b) {
  const i = arr.indexOf(a)
  const j = arr.indexOf(b)
  swap(arr, i, j)
}

function rotate(arr, dir, steps) {
  const realSteps = steps % arr.length
  const moved = dir === -1
    ? arr.splice(0, realSteps)
    : arr.splice(0, arr.length - realSteps)
  arr.push(...moved)
}

function rotateByLetter(arr, letter) {
  const i = arr.indexOf(letter)
  const steps = 1 + i + (i >= 4)
  rotate(arr, 1, steps)
}

function rotateByLetterReverse(arr, letter) {
  const i = arr.indexOf(letter)
  const j = reverseRotationIndexs[i]
  const steps = Math.abs(j - i)
  const dir = Math.sign(j - i)
  rotate(arr, dir, steps)
}

function reverse(arr, i, j) {
  while (i < j) {
    swap(arr, i++, j--)
  }
}

function move(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0])
}

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const instructions = part2 ? input.reverse() : input
  const password = part2 ? 'fbgdceah' : 'abcdefgh'
  const n = input.length
  let str = password.split('')
  let ans = ''

  const regex = new RegExp('(?:' +
    '(swap) position (\\d+) with position (\\d+)|' +
    '(swap) letter (\\w) with letter (\\w)|' +
    '(rotate) (left|right) (\\d+) steps?|' +
    '(rotate) based on position of letter (\\w)|' +
    '(reverse) positions (\\d+) through (\\d+)|' +
    '(move) position (\\d+) to position (\\d+)' +
    ')')

  for (const line of instructions) {
    const [_, action, a, b] = line.match(regex).filter(Boolean)

    switch (action) {
      case 'swap':
        if (Number.isInteger(+a)) swap(str, +a, +b)
        else swapByLetter(str, a, b)
        break;
      case 'rotate':
        if (part2) {
          if (b) rotate(str, -dirs[a], +b)
          else rotateByLetterReverse(str, a)
        } else {
          if (b) rotate(str, dirs[a], +b)
          else rotateByLetter(str, a)
        }
        break;
      case 'reverse':
        reverse(str, +a, +b)
        break;
      case 'move':
        part2 ? move(str, +b, +a) : move(str, +a, +b)
        break;
    }
  }

  ans = str.join('')

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

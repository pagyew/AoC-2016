const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim().split('\n')

class Heap {
  constructor(cond, initValues = []) {
    this.heap = []
    this.cond = cond ?? ((a, b) => a < b)
    initValues.forEach(val => this.add(val))
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }

  add(val) {
    this.heap.push(val)
    this.heapifyUp()
  }

  get peek() {
    return this.heap[0]
  }

  pop() {
    this.swap(0, this.size - 1)
    const val = this.heap.pop()
    this.heapifyDown()
    return val
  }

  compare(i, j) {
    const [a, b] = [this.heap[i], this.heap[j]]
    return a != void 0 && b != void 0 && this.cond(a, b)
  }

  heapifyUp() {
    let i = this.size - 1
    while (i > 0) {
      const pi = ((i - 1) / 2) >> 0
      if (this.compare(pi, i)) break
      this.swap(pi, i)
      i = pi
    }
  }

  heapifyDown() {
    let i = 0
    while (true) {
      const l = 2 * i + 1
      const r = 2 * i + 2
      let min = i
      if (l < this.heap.length && this.compare(l, min)) min = l
      if (r < this.heap.length && this.compare(r, min)) min = r
      if (min == i) break
      this.swap(i, min)
      i = min
    }
  }

  get size() {
    return this.heap.length
  }
}

function getBit(number, bitPosition) {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

function setBit(number, bitPosition) {
  return number | (1 << bitPosition);
}

function clearBit(number, bitPosition) {
  const mask = ~(1 << bitPosition);
  return number & mask;
}

function check(prev, next, evenArr) {
  return !(
    (evenArr.some(i => getBit(prev, i) && !getBit(prev, i + 1)) && (prev & 10922)) ||
    (evenArr.some(i => getBit(next, i) && !getBit(next, i + 1)) && (next & 10922))
  )
}

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = input.length
  const expected = (part2 ? 2 ** 14 : 2 ** 10) - 1
  let ans = Infinity
  const matrix = part2
    ? [15375, 752, 256, 0]
    : [960, 47, 16, 0]

  const len = part2 ? 14 : 10
  const evenArr = Array(len / 2).fill().map((_, i) => i * 2)
  const seen = new Map()
  const stack = new Heap(
    (a, b) => a[1] < b[1],
    [[0, 0, matrix]]
  )

  while (stack.size) {
    const [index, count, matrix] = stack.pop()
    const str = JSON.stringify(matrix)
    const hash = [index, str].join()

    if (matrix[3] === expected) {
      ans = Math.min(ans, count)
      break
    }

    if (seen.has(hash)) continue
    seen.set(hash, count)

    for (let nextIndex of [index + 1, index - 1]) {
      if (nextIndex < 0 || nextIndex > 3) continue

      for (let i = 0; i < len; i++) {
        if (!getBit(matrix[index], i)) continue

        const copy1 = JSON.parse(str)

        copy1[index] = clearBit(copy1[index], i)
        copy1[nextIndex] = setBit(copy1[nextIndex], i)

        if (check(copy1[index], copy1[nextIndex], evenArr)) {
          stack.add([nextIndex, count + 1, copy1])
        }

        for (let j = i + 1; j < len; j++) {
          if (!getBit(matrix[index], j)) continue

          const copy2 = JSON.parse(JSON.stringify(copy1))

          copy2[index] = clearBit(copy2[index], j)
          copy2[nextIndex] = setBit(copy2[nextIndex], j)

          if (check(copy2[index], copy2[nextIndex], evenArr)) {
            stack.add([nextIndex, count + 1, copy2])
          }
        }
      }
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

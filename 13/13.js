const { readFileSync } = require('node:fs')
const { basename } = require('node:path')

const day = basename(__filename, '.js')
const input = readFileSync(__dirname + `/${day}.txt`, 'utf8').trim()

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

function sign(i, j, x) {
  let sum = j * j + 3 * j + 2 * j * i + i + i * i + x
  let count = 0

  while (sum) {
    count++
    sum &= sum - 1
  }

  return ['.', '#'][count % 2]
}

for (let part2 of [false, true]) {
  console.time(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)

  const n = 50
  const matrix = Array(n).fill(null).map(() => Array(n).fill(0))
  let ans = 0

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = sign(i, j, +input)
    }
  }

  const seen = new Set()
  const heap = new Heap((a, b) => a[2] < b[2], [[1, 1, 0]])

  while (heap.size) {
    const [i, j, k] = heap.pop()
    const key = [i, j].join()

    if (part2 && k > 50) {
      ans = Math.max(ans, seen.size)
      continue
    } else if (i === 39 && j === 31) {
      ans = k
      break
    }

    if (seen.has(key)) continue
    seen.add(key)

    for (let [ni, nj] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) {
      if (
        ni >= 0 &&
        nj >= 0 &&
        matrix[ni][nj] === '.'
      ) heap.add([ni, nj, k + 1])
    }
  }

  console.log(ans);
  console.timeEnd(`day ${day} ${part2 ? 'part 2' : 'part 1'}`)
}

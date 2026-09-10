<div align="center">
  <img src=".github/assets/cover.png" alt="Advent of Code — project illustration" width="100%" />
  <h1>Advent of Code 2016</h1>
  <p><strong>A December of puzzles, explored in JavaScript.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/JavaScript-Node.js-f7df1e?style=flat-square" alt="JavaScript: Node.js" />
    <img src="https://img.shields.io/badge/days-21%20directories-0f766e?style=flat-square" alt="days: 21 directories" />
  </p>
  <p><a href="#quick-start">Quick start</a> · <a href="#browse-the-days">Solutions</a> · <a href="https://adventofcode.com/2016">Puzzles</a></p>
</div>

---

Personal implementations for [Advent of Code 2016](https://adventofcode.com/2016), with one directory per day and a small input-download helper.

## Quick start

Use Node.js. To download inputs with the helper, your Node.js version must provide built-in `fetch`; the helper also expects the VS Code `code` command.

```sh
git clone https://github.com/pagyew/AoC-2016.git
cd AoC-2016
node 01/1.js
```

Before running, save your personal Day 1 puzzle input as `01/1.txt`. Input files are not included. Other days use the same pattern: `DD/D.txt` beside `DD/D.js`.

### Download an input

Set `COOKIE` to the full cookie value, including the `session=` prefix:

```sh
COOKIE="session=YOUR_SESSION_COOKIE" node getInput.js 1
```

The helper downloads the input, creates missing files, and opens the solution in VS Code. Keep the cookie private. You can also download input manually and open the solution in any editor.

## Browse the days

Links show checked-in implementations, not a verified star count.

|     01–05     |     06–10      |     11–15      |     16–20      |     21–25      |
| :-----------: | :------------: | :------------: | :------------: | :------------: |
| [01](01/1.js) | [06](06/6.js)  | [11](11/11.js) | [16](16/16.js) | [21](21/21.js) |
| [02](02/2.js) | [07](07/7.js)  | [12](12/12.js) | [17](17/17.js) |       —        |
| [03](03/3.js) | [08](08/8.js)  | [13](13/13.js) | [18](18/18.js) |       —        |
| [04](04/4.js) | [09](09/9.js)  | [14](14/14.js) | [19](19/19.js) |       —        |
| [05](05/5.js) | [10](10/10.js) | [15](15/15.js) | [20](20/20.js) |       —        |

## Repository guide

| File                       | Purpose                          |
| -------------------------- | -------------------------------- |
| `DD/D.js`                  | A day’s implementation           |
| `DD/D.txt`                 | Your local puzzle input          |
| [getInput.js](getInput.js) | Input download and file creation |
| [template.js](template.js) | Starting point for another day   |

<!-- Сообщение сформировано агентом -->

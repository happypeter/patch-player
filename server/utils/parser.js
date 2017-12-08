const fs = require('fs')

// const fs = require('fs')
// 只处理一个 diff，并且 diff 中只有一个 hunk 的情况

function parseFile(s) {
  return s
}

function parser(diff) {
  let file = {
    from: '',
    lines: []
  }
  let lineNum = 0

  let lines = diff.split('\n')
  let matches
  for(let i = 0; i < lines.length; i++) {
    let line = lines[i]
    matches = line.match(/^diff\s\-\-git\s("a\/.*"|a\/.*)\s("b\/.*"|b\/.*)$/)

    if(matches) {
      file.from = parseFile(matches[1])
    }

    if (/^@@\s+\-(\d+),(\d+)\s+\+(\d+),(\d+)\s@@/.test(line)) {
      matches = line.match(/^@@\s+\-(\d+),(\d+)\s+\+(\d+),(\d+)\s@@/)

      lineNum += Number(matches[1])
    }

    if (/^\-{3}\s/.test(line) || /^\+{3}\s/.test(line)) {
      continue
    }

    if (/^\-/.test(line)) {
      file.lines.push({
        type: "deleted",
        text: line.substr(1),
        lineNum: lineNum++
      })
      continue
    }

    if (/^\+/.test(line)) {
      file.lines.push({
        type: "added",
        text: line.substr(1),
        lineNum: lineNum,
      })
      continue
    }

    if (/^\s/.test(line)) {
      lineNum++
    }
  }
  return file
}

module.exports = parser

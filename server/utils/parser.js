exports.diff = (diff) => {
  let patch = []
  let lineNum = 0

  let lines = diff.split('\n')
  let matches
  for(let i = 0; i < lines.length; i++) {
    let line = lines[i]

    if (/^@@\s+\-(\d+),(\d+)\s+\+(\d+),(\d+)\s@@/.test(line)) {
      matches = line.match(/^@@\s+\-(\d+),(\d+)\s+\+(\d+),(\d+)\s@@/)

      lineNum += Number(matches[1])
    }

    if (/^\-{3}\s/.test(line) || /^\+{3}\s/.test(line)) {
      continue
    }

    if (/^\-/.test(line)) {
      patch.push({
        type: "deleted",
        text: line.substr(1),
        lineNum: lineNum++
      })
      continue
    }

    if (/^\+/.test(line)) {
      patch.push({
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

  return patch
}

function escape(str) {
  return str
    .replace( /&/g, '&amp;' )
    .replace( /</g, '&lt;' )
    .replace( />/g, '&gt;' )
    .replace( /\t/g, '  ' );
}

exports.markUpDiff = (diff) => {
  let diffClasses = {
    'd': 'file',
    'i': 'file',
    '@': 'info',
    '-': 'delete',
    '+': 'insert',
    ' ': 'context'
  }

  let tmp = []
  let marker = false
  let idx
  diff.split('\n').forEach((line, index) => {
    let type = line.charAt(0)
    if (type === '@' && marker === false) {
      marker = true
      idx = index
    }
    let text
    type === '@' ? text = line : text = line.slice(1)
    tmp.push("<pre class='" + diffClasses[type] + "'>" + escape(text) + "</pre>")
  })
  return tmp.slice(idx).join('\n')
}

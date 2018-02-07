import { HUNK_META, DELETED_LINE, ADDED_LINE } from '../constants/RegExp'
import * as mutationTypes from '../constants/MutationTypes'

export const parse = patch => {
  const hunks = splitPatchToHunks(patch)
  const result = hunks.map(t => {
    return parseHunk(t)
  })
  return flatMutations(result)
}

export const splitPatchToHunks = patch => {
  const lines = patch.split('\n')
  let i = 0
  return lines.reduce((hunks, t) => {
    if (HUNK_META.test(t)) {
      i += 1
    }
    hunks[i - 1] = hunks[i - 1] || ''
    hunks[i - 1] = hunks[i - 1] + t + '\n'
    return hunks
  }, [])
}

export const parseHunk = hunk => {
  let mutations = []
  let hunkLines = hunk.split('\n')
  let metaMatches = hunkLines[0].match(HUNK_META)
  console.log('parseHunk', metaMatches)
  let startLineNum = Number(metaMatches[3])

  const mainLines = hunkLines.slice(1)
  let offSet = 0
  for (let i = 0; i < hunkLines.length; i++) {
    let line = mainLines[i]
    if (DELETED_LINE.test(line)) {
      mutations.push({
        type: mutationTypes.DELETE,
        text: line.substr(1),
        lineNum: startLineNum + offSet
      })
      continue
    }

    if (ADDED_LINE.test(line)) {
      mutations.push({
        type: mutationTypes.ADD,
        text: line.substr(1),
        lineNum: startLineNum + offSet
      })
      offSet += 1
      continue
    }
    offSet += 1
  }
  return mutations
}

const flatMutations = arr => {
  let offSet = 0
  return arr.reduce((a, subArr) => {
    const newSubArr = subArr.map(t => ({ ...t, lineNum: t.lineNum + offSet }))
    offSet += getOffSet(subArr)
    a = [...a, ...newSubArr]
    return a
  }, [])
}

const getOffSet = hunkMutaionArr => {
  return hunkMutaionArr.reduce((offSet, item) => {
    offSet = item.type === mutationTypes.ADD ? offSet + 1 : offSet - 1
    return offSet
  }, 0)
}

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\t/g, '  ')
}

export const markupPatch = patch => {
  let classes = {
    d: 'file',
    i: 'file',
    '@': 'info',
    '-': 'delete',
    '+': 'insert',
    ' ': 'context'
  }

  let tmp = []
  let marker = false
  let idx
  patch.split('\n').forEach((line, index) => {
    let type = line.charAt(0)
    if (type === '@' && marker === false) {
      marker = true
      idx = index
    }
    tmp.push("<pre class='" + classes[type] + "'>" + escape(line) + '</pre>')
  })
  return tmp.slice(idx).join('\n')
}

export const removePatchMetadata = patch => {
  const arr = patch.split('\n')
  let index = 0
  for (let i = 0; i < arr.length; i++) {
    let type = arr[i].charAt(0)
    let marker = false
    if (type === '@' && marker === false) {
      marker = true
      index = i
      break
    }
  }
  return arr.slice(index).join('\n')
}

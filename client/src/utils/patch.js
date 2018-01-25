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
  let startLineNum = Number(metaMatches[1])

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

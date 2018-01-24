import {
  HUNK_META,
  DELETED_LINE,
  ADDED_LINE
} from '../constants/RegExp'
import * as mutationTypes from '../constants/MutationTypes'


export const parse = patch => {
  return parseHunk(patch)
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

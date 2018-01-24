import { 
  HUNK_META,
  DELETED_LINE,
  ADDED_LINE
} from '../constants/RegExp'
import * as mutationTypes from '../constants/MutationTypes'

export function eachPromise(str, iterator, index) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current, index))
    
  return Array.from(str).reduce(promiseReducer, Promise.resolve());
}


export const insertEmptyLineAtIndex = (arr, index) => {
  return [
    ...arr.slice(0, index),
    '',
    ...arr.slice(index)
  ]
}

export const insertCharacterAtIndex = (arr, char, index) => {
  return arr.map(
    (t, i) => {
      if (i === index) {
        return t + char
      }
      return t
    }
  )
}

export const removeElementAtIndex = (arr, index) => {
  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ]
}

export const addHintToDeletedLine = (textlines, index) => {
  return textlines.map(
    (t, i) => {
      if (i === index) {
        return t + 'DELETE'
      }
      return t
    }
  )
}


export const parsePatch = patch => {
  let mutations = []
  let hunkLines = patch.split('\n')
  let metaMatches = hunkLines[0].match(HUNK_META)
  let startLineNum = Number(metaMatches[1])

  const patchLines = hunkLines.slice(1)
  let offSet = 0 
  for (let i = 0; i < patchLines.length; i++) {
    let line = patchLines[i]
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

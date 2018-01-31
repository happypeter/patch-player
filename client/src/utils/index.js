import { LINE_HEIGHT } from '../constants/Editor'

export function eachPromise(str, iterator, ...args) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current, ...args))
  return Array.from(str).reduce(promiseReducer, Promise.resolve())
}

export const insertEmptyLineAtIndex = (arr, index) => {
  return [...arr.slice(0, index), '', ...arr.slice(index)]
}

export const insertCharacterAtIndex = (arr, char, index) => {
  const result = arr.map((t, i) => {
    if (i === index) {
      return t + char
    }
    return t
  })
  return result
}

export const removeElementAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export const getToY = (currentLineNum, position) => {
  return getScrollLineCount(currentLineNum, position) * LINE_HEIGHT
}

const getScrollLineCount = (currentLineNum, position) => {
  // const editorHeight = position.editorHeight
  const { offset, editorHeight } = position
  if (currentLineNum - offset > editorHeight - 2) {
    return currentLineNum - offset - 2
  } else {
    return 0
  }
}

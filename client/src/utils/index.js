import position from '../reducers/position'

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

export const getToY = (currentLineNum, state) => {
  // const editorHeight = position.editorHeight
  const totalLineCount = state.file.split('\n').length
  const { offset, editorHeight } = state.position
  console.log('getToY', state)

  if (currentLineNum - offset > editorHeight - 2) {
    if (currentLineNum + 18 > totalLineCount) {
      // 文件快要到底部了
      return totalLineCount - 20 - offset
    }
    return currentLineNum - offset - 2
  } else {
    return 0
  }
}

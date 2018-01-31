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

export const getToY = (currentLineNum, position, state) => {
  // const editorHeight = position.editorHeight
  const totalLineCount = state.file.split('\n').length
  const { offset, editorHeight } = position

  // toY 的值会收到文件总行数的影响，因为最后一次滚动，会因为滚动到底部而停止

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

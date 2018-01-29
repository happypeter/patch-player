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

export const scrollToY = (lineNum, offset) => {
  const containerHeight = 850
  const position = lineNum * 24 - offset
  if (position < containerHeight) {
    const bottom = position + 24 * 5
    if (bottom > containerHeight) {
      return 500
    } else {
      return 0
    }
  } else {
    const pages = Math.floor(position / containerHeight)
    if (position % containerHeight + 24 * 5 > containerHeight) {
      return pages * containerHeight + 500
    } else {
      return pages * containerHeight
    }
  }
}

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

export const scrollToY = (lineNum, position) => {
  const offset = position.offset
  const height = position.containerHeight
  const current = lineNum * 24 - offset
  if (current < height) {
    const bottom = current + 24 * 5
    if (bottom > height) {
      return 500
    } else {
      return 0
    }
  } else {
    const pages = Math.floor(current / height)
    if (current % height + 24 * 5 > height) {
      return pages * height + 500
    } else {
      return pages * height
    }
  }
}

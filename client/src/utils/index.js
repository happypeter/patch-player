import * as mutationTypes from '../constants/MutationTypes'

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

const getOffSet = hunkMutaionArr => {
  return hunkMutaionArr.reduce((offSet, item) => {
    offSet = item.type === mutationTypes.ADD ? offSet + 1 : offSet - 1
    return offSet
  }, 0)
}

let offSet = 0
export const flat = arr => {
  return arr.reduce((a, subArr) => {
    const newSubArr = subArr.map(t => ({ ...t, lineNum: t.lineNum + offSet }))
    offSet += getOffSet(subArr)
    a = [...a, ...newSubArr]
    return a
  }, [])
}

export const removeElementAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

import * as mutationTypes from '../constants/MutationTypes'

export function eachPromise(str, iterator, index, dispatch) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current, index, dispatch))
  return Array.from(str).reduce(promiseReducer, Promise.resolve())
}

export function eachMutationPromise(mutations, iterator) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current))
  return Array.from(mutations).reduce(promiseReducer, Promise.resolve())
}

export const insertEmptyLineAtIndex = (arr, index) => {
  return [...arr.slice(0, index), '', ...arr.slice(index)]
}

export const insertCharacterAtIndex = (arr, char, index) => {
  console.log('index----', index)
  const result = arr.map((t, i) => {
    if (i === index) {
      console.log('i===index', i === index)
      console.log('char....', char)
      return t + char
    }
    return t
  })
  console.log('insertFun......', result)
  return result
}

/*
  hunkMutaionArr = [
    {type: "DELETE", text: "import Prism from 'prismjs'", lineNum: 7}
    {type: "ADD", text: "import Prsm from 'prismjs'", lineNum: 8}
  ]
*/

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

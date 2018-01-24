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

export const flat = arr => {
  return arr.reduce(
    (a, t) => {
      a = [...a, ...t]
      return a  
    }
    , []
  )
}

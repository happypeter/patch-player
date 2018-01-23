export function eachPromise(str, iterator) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current))
    
  return Array.from(str).reduce(promiseReducer, Promise.resolve());
}


export const removeLine = (arr, index) => {
  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ]
}

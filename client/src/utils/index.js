export function eachPromise(str, iterator) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current))
    
  return Array.from(str).reduce(promiseReducer, Promise.resolve());
}

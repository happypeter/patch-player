import * as utils from '../utils/'

export const removeLine = mutation => dispatch => {
  return new Promise(resolve => {
    dispatch({ type: 'ADD_DELETE_HINT', mutation })
    const deleteLine = () => {
      dispatch({ type: 'DELETE_LINE', mutation })
      resolve()
    }
    setTimeout(deleteLine, 2000)
  })
}

export const insertLine = mutation => dispatch => {
  dispatch({type: 'INSERT_EMPTY_LINE', mutation})
  // return new Promise(resolve => {
  //   dispatch({type: 'INSERT_LINE', mutation})
  //   return resolve()
  // })
}

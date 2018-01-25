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


const typeCharacter = (character, index, dispatch) => {
  return new Promise(resolve => {
    const type = () => {
      dispatch({ type: 'TYPE_CHARACTER', character, index })
      resolve()
    }
    setTimeout(type, 20)
  })
}

export const insertLine = mutation => dispatch => {
  dispatch({type: 'INSERT_EMPTY_LINE', mutation})
  const index = mutation.lineNum - 1
  return utils.eachPromise(mutation.text, typeCharacter, index, dispatch)
}

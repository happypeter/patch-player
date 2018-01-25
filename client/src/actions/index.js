import * as utils from '../utils/'
import * as patch from '../utils/patch'

const applyMutation = (mutation, dispatch) => {
  if (mutation.type === 'DELETE') return removeLine(mutation, dispatch)
  return insertLine(mutation, dispatch)
}

export const handleMutations = () => (dispatch, getState) => {
  const mutations = patch.parse(getState().patch)
  utils.eachMutationPromise(mutations, applyMutation, dispatch)
}

const removeLine = (mutation, dispatch) => {
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

const insertLine = (mutation, dispatch) => {
  dispatch({ type: 'INSERT_EMPTY_LINE', mutation })
  const index = mutation.lineNum - 1
  return utils.eachPromise(mutation.text, typeCharacter, index, dispatch)
}

import * as utils from '../utils/'
import * as patch from '../utils/patch'
import * as mutationTypes from '../constants/MutationTypes'
import * as actionTypes from '../constants/ActionTypes'

const applyMutation = (mutation, dispatch) => {
  if (mutation.type === mutationTypes.DELETE)
    return removeLine(mutation, dispatch)
  return insertLine(mutation, dispatch)
}

export const handleMutations = () => (dispatch, getState) => {
  const mutations = patch.parse(getState().patch)
  utils.eachPromise(mutations, applyMutation, dispatch)
}

const removeLine = (mutation, dispatch) => {
  return new Promise(resolve => {
    dispatch({ type: actionTypes.ADD_DELETE_HINT, mutation })
    const deleteLine = () => {
      dispatch({ type: actionTypes.DELETE_LINE, mutation })
      resolve()
    }
    setTimeout(deleteLine, 2000)
  })
}

const insertLine = (mutation, dispatch) => {
  dispatch({ type: actionTypes.INSERT_EMPTY_LINE, mutation })
  const index = mutation.lineNum - 1
  return utils.eachPromise(mutation.text, typeCharacter, index, dispatch)
}

const typeCharacter = (character, index, dispatch) => {
  return new Promise(resolve => {
    const type = () => {
      dispatch({ type: actionTypes.TYPE_CHARACTER, character, index })
      resolve()
    }
    setTimeout(type, 20)
  })
}

export const setProjectPath = () => dispatch => {
  dispatch({ type: 'SET_PROJECT_PATH' })
}

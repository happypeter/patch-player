import * as utils from '../utils/'
import * as patch from '../utils/patch'
import * as mutationTypes from '../constants/MutationTypes'
import * as actionTypes from '../constants/ActionTypes'

const applyMutation = (mutation, dispatch, getState) => {
  if (mutation.type === mutationTypes.DELETE)
    return removeLine(mutation, dispatch, getState)
  return insertLine(mutation, dispatch, getState)
}

export const handleMutations = () => (dispatch, getState) => {
  const mutations = patch.parse(getState().patch)
  utils.eachPromise(mutations, applyMutation, dispatch, getState)
}

const removeLine = (mutation, dispatch, getState) => {
  return new Promise(resolve => {
    const toY = utils.scrollToY(mutation.lineNum, getState().position)
    if (toY) {
      dispatch({ type: actionTypes.SCROLL_BOTTOM, toY })
    }
    dispatch({ type: actionTypes.ADD_DELETE_HINT, mutation })
    const deleteLine = () => {
      dispatch({ type: actionTypes.DELETE_LINE, mutation })
      resolve()
    }
    setTimeout(deleteLine, 2000)
  })
}

const insertLine = (mutation, dispatch, getState) => {
  const toY = utils.scrollToY(mutation.lineNum, getState().position)
  if (toY) {
    dispatch({ type: actionTypes.SCROLL_BOTTOM, toY })
  }
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

export const setScrollContainerHeight = height => {
  return { type: actionTypes.SET_SCROLL_CONTAINER_HEIGHT, height }
}

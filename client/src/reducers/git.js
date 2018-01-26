import * as actionTypes from '../constants/ActionTypes'

const initialState = []
const git = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_COMMITS:
      return [...action.commits]
    default:
      return state
  }
}

export default git

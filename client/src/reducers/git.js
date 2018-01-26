import * as actionTypes from '../constants/ActionTypes'

const initialState = {
  repo: localStorage.repo || '',
  commits: []
}

const git = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_COMMITS:
      return { ...state, commits: action.commits }
    case actionTypes.SET_REPO:
      return { ...state, repo: action.repo }
    default:
      return state
  }
}

export default git

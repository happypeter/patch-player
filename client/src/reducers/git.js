import * as actionTypes from '../constants/ActionTypes'

const initialState = {
  repo: localStorage.repo || '',
  commits: [],
  commit: '',
  files: [],
  changed: []
}

const git = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_COMMITS:
      return { ...state, commits: action.commits }
    case actionTypes.SET_REPO:
      return { ...state, repo: action.repo }
    case actionTypes.SELECT_COMMIT:
      return { ...state, commit: action.commit}
    case actionTypes.LOAD_COMMIT_FILES:
      return { ...state, files: action.data.files, changed: action.data.changed}
    default:
      return state
  }
}

export default git

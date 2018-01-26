import * as actionTypes from '../constants/ActionTypes'

export const loadCommits = (commits) => dispatch => {
  dispatch({ type: actionTypes.LOAD_COMMITS , commits })
}

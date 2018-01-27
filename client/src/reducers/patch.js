import * as types from '../constants/ActionTypes'

const patch = (state = '', action) => {
  switch (action.type) {
    case types.SET_PATCH:
      return action.patch
    default:
      return state
  }
}

export default patch

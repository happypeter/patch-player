import * as types from '../constants/ActionTypes'

const initialState = { offset: 0, toY: 0 }
const position = (state = initialState, action) => {
  switch (action.type) {
    case types.SCROLL_BOTTOM:
      return { offset: state.offset + action.toY, toY: action.toY }
    case types.SCROLL_TOP:
      return { offset: 0, toY: -state.offset }
    default:
      return state
  }
}

export default position

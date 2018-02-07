import * as types from '../constants/ActionTypes'

const initialState = {
  offset: 0,
  toY: 0,
  editorHeight: 20
}
const position = (state = initialState, action) => {
  switch (action.type) {
    case types.SCROLL_DOWN:
      return { ...state, offset: state.offset + action.toY, toY: action.toY }
    case types.SCROLL_TO_TOP:
      return { ...state, offset: 0, toY: -state.offset }
    case types.RESET_TO_Y:
      return { ...state, toY: 0 }
    default:
      return state
  }
}

export default position

import * as types from '../constants/ActionTypes'

const initialState = {
  offset: 0,
  toY: 0,
  containerHeight: 0
}
const position = (state = initialState, action) => {
  switch (action.type) {
    case types.SCROLL_BOTTOM:
      return { ...state, offset: state.offset + action.toY, toY: action.toY }
    case types.SCROLL_TOP:
      return { ...state, offset: 0, toY: -state.offset }
    case types.SET_SCROLL_CONTAINER_HEIGHT:
      return { ...state, containerHeight: action.height }
    default:
      return state
  }
}

export default position

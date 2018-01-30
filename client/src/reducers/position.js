import * as types from '../constants/ActionTypes'

const initialState = {
  offset: 0,
  toY: 0,
  containerHeight: 0
}
const position = (state = initialState, action) => {
  switch (action.type) {
    case types.SCROLL_DOWN:
      return { ...state, offset: state.offset + action.toY, toY: action.toY }

    case types.SCROLL_TO_TOP:
      // 切换文件的时候，滚动到顶部，这个是不需要的 FIXME
      return { ...state, offset: 0, toY: -state.offset }
    case types.SET_SCROLL_CONTAINER_HEIGHT:
      return { ...state, containerHeight: action.height }
    default:
      return state
  }
}

export default position

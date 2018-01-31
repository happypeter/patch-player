import * as types from '../constants/ActionTypes'

const initialState = {
  offset: 0, // 已经在编辑器顶部遮挡的行数
  toY: 0, // 向下滚动的像素值，等于行数*20
  containerHeight: 0 // 编辑器视窗总行数
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

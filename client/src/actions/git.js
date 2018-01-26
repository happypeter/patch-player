import * as actionTypes from '../constants/ActionTypes'
import socket from '../utils/socket'

export const loadCommits = (commits) => dispatch => {
  dispatch({ type: actionTypes.LOAD_COMMITS , commits })
}

export const setRepo = repo => dispatch => {
  console.log('setRepo...', repo)
  socket.emit('repo', { repo }) //FIXME: 最好用 axios ，这样发送失败会有反馈
  localStorage.setItem('repo', repo)
  dispatch({ type: actionTypes.SET_REPO, repo })
}

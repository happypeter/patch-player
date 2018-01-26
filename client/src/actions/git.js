import * as actionTypes from '../constants/ActionTypes'
import socket from '../utils/socket'

export const loadCommits = commits => dispatch => {
  dispatch({ type: actionTypes.LOAD_COMMITS, commits })
}

export const selectCommit = (commit, repo) => dispatch => {
  socket.emit('commit', { commit: commit.slice(0, 7), repo })
  dispatch({ type: actionTypes.SELECT_COMMIT, commit })
}

export const loadCommitFiles = data => dispatch => {
  dispatch({ type: actionTypes.LOAD_COMMIT_FILES, data })
}

export const setRepo = repo => dispatch => {
  socket.emit('repo', { repo }) //FIXME: 最好用 axios ，这样发送失败会有反馈
  localStorage.setItem('repo', repo)
  dispatch({ type: actionTypes.SET_REPO, repo })
}

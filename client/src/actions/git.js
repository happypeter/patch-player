import * as actionTypes from '../constants/ActionTypes'
// import socket from '../utils/socket'
import { removePatchMetadata } from '../utils/patch'

export const loadCommits = commits => dispatch => {
  dispatch({ type: actionTypes.LOAD_COMMITS, commits })
}

export const selectCommit = (commit, repo) => dispatch => {
  // socket.emit('commit', { commit: commit.slice(0, 7), repo })
  dispatch({ type: actionTypes.SELECT_COMMIT, commit })
  dispatch({ type: actionTypes.SET_PATCH, patch: '' })
}

export const loadCommitFiles = data => dispatch => {
  dispatch({ type: actionTypes.LOAD_COMMIT_FILES, data })
}

export const selectFile = data => dispatch => {
  // socket.emitsocket.emit('file', data)
  // FIXME: 有了 sync-middleware ，本文件中的所有 emit 应该都可以删除了。
  dispatch({ type: actionTypes.SELECT_FILE, file: data.file })
  dispatch({ type: actionTypes.SET_PATCH, patch: '' })
}

export const loadFileAndPatch = data => dispatch => {
  dispatch({ type: actionTypes.SCROLL_TO_TOP })
  if (data.content) {
    dispatch({ type: actionTypes.SET_FILE, file: data.content })
  }
  if (data.patch) {
    dispatch({
      type: actionTypes.SET_PATCH,
      patch: removePatchMetadata(data.patch)
    })
  }
  // Home 页从 store 中获取所展示文件的文件名
  dispatch({ type: actionTypes.SELECT_FILE, file: data.file })
}

export const setRepo = repo => dispatch => {
  // socket.emit('repo', { repo }) //FIXME: 最好用 axios ，这样发送失败会有反馈
  console.log('setRepo......')
  localStorage.setItem('repo', repo)
  dispatch({ type: actionTypes.SET_REPO, repo })
}

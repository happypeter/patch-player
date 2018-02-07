import * as actionTypes from '../constants/ActionTypes'
import { SERVER } from '../constants/ApiConstants'
import axios from 'axios'
import { removePatchMetadata } from '../utils/patch'

const loadCommits = commits => ({ type: actionTypes.LOAD_COMMITS, commits })

export const selectCommit = (commit, repo) => dispatch => {
  axios
    .post(`${SERVER}/commit-detail`, { commit: commit.slice(0, 7), repo })
    .then(res => {
      console.log('commit-detail, res.data', res.data)
      dispatch(loadCommitFiles(res.data))
      dispatch({ type: actionTypes.SELECT_COMMIT, commit })
      dispatch({ type: actionTypes.SET_PATCH, patch: '' })
    })
}

export const loadCommitFiles = data => ({
  type: actionTypes.LOAD_COMMIT_FILES,
  data
})

export const selectFile = data => dispatch => {
  axios.post(`${SERVER}/file-detail`, data).then(res => {
    console.log('selectFile', res.data)
    loadFileAndPatch(res.data, dispatch)
    dispatch({ type: actionTypes.SELECT_FILE, file: data.file })
  })
}

export const loadFileAndPatch = (data, dispatch) => {
  // WIP
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
  localStorage.setItem('repo', repo)
  axios.post(`${SERVER}/commits`, { repo }).then(res => {
    dispatch(loadCommits(res.data.commits))
  })
  dispatch({ type: actionTypes.SET_REPO, repo })
}

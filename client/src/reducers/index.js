import { combineReducers } from 'redux'
import patch from './patch'
import file from './file'
import git from './git'

export default combineReducers({
  patch,
  file,
  git
})

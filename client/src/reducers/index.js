import { combineReducers } from 'redux'
import patch from './patch'
import file from './file'
import git from './git'
import position from './position'

export default combineReducers({
  patch,
  file,
  git,
  position
})

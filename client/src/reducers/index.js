import { combineReducers } from 'redux'
import patch from './patch'
import file from './file'

export default combineReducers({
  patch,
  file
})

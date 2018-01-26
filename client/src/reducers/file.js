import * as utils from '../utils'
import * as types from '../constants/ActionTypes'

const initialState = `import styled from 'styled-components'
 import Typist from '../typist/Typist'
 import io from 'socket.io-client'
 import Prism from 'prismjs'
 import 'prismjs/components/prism-javascript'
 import 'prismjs/components/prism-markup'
 import 'prismjs/components/prism-jsx'
 dsds
 sdsd
 sd
 sd
 sd
 sds
 ds
 d
 d
 d
 d
 d
 d
   componentDidMount = () => {
     const socket = io(SERVER_URL);
    socket.on('file content and patch', data => {
      const {files, commit} = this.state
       if (commit === data.commit) {
         const exist = files.find(file => file.name === data.file.name)
         if (!exist) {
`

const file = (state = '', action) => {
  const textLines = state.split('\n')

  switch (action.type) {
    case types.SET_FILE:
      return action.file
    case types.ADD_DELETE_HINT:
      return textLines
        .map((t, i) => {
          if (i === action.mutation.lineNum - 1) {
            return (t = `${t} DELETE-HINT`)
          }
          return t
        })
        .join('\n')
    case types.DELETE_LINE:
      const index = action.mutation.lineNum - 1
      return utils.removeElementAtIndex(textLines, index).join('\n')
    case types.INSERT_EMPTY_LINE:
      const idx = action.mutation.lineNum - 1
      return utils.insertEmptyLineAtIndex(textLines, idx).join('\n')
    case types.TYPE_CHARACTER:
      return utils
        .insertCharacterAtIndex(textLines, action.character, action.index)
        .join('\n')
    default:
      return state
  }
}

export default file

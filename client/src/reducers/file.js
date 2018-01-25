import * as utils from '../utils'

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

const removeElementAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

const insertEmptyLineAtIndex = (arr, index) => {
  return [...arr.slice(0, index), '', ...arr.slice(index)]
}

const file = (state = initialState, action) => {
  const textLines = state.split('\n')
 
  switch (action.type) {
    case 'ADD_DELETE_HINT':
      return textLines.map((t, i) => {
          if (i === action.mutation.lineNum - 1) {
            return t = `${t} DELETE`
          }
          return t
        }).join('\n')
      case 'DELETE_LINE':
        const index = action.mutation.lineNum - 1
        return removeElementAtIndex(textLines, index).join('\n')
      case 'INSERT_EMPTY_LINE':
        const idx = action.mutation.lineNum - 1
        return insertEmptyLineAtIndex(textLines, idx).join('\n')
      case 'TYPE_CHARACTER':
        return utils.insertCharacterAtIndex(textLines, action.character, action.index).join('\n')
      case 'INSERT_LINE':
        return state
    default:
      return state
  }
}

export default file

import React, { Component } from 'react'
import * as utils from '../utils/'
import * as patch from '../utils/patch'

class Main extends Component {
  state = {
    textLines: []
  }

  componentWillMount() {
    const file = `import styled from 'styled-components'
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

    const textLines = file.split('\n')
    this.setState({
      textLines
    })
  }

  typeCharacter = (character, index) => {
    return new Promise(resolve => {
      let textLines = utils.insertCharacterAtIndex(
        this.state.textLines,
        character,
        index
      )
      this.setState({ textLines }, () => {
        const delay = 100
        setTimeout(resolve, delay)
      })
    })
  }

  insertLine = mutation => {
    const { textLines } = this.state
    let index = mutation.lineNum - 1
    const newTextLines = utils.insertEmptyLineAtIndex(textLines, index)
    this.setState({
      textLines: newTextLines
    })
    // 先开辟出新行来，然后在下面的代码中在新的空白行中逐渐添加字符
    return utils.eachPromise(mutation.text, this.typeCharacter, index)
  }

  removeLine = mutation => {
    const { textLines } = this.state
    const { lineNum } = mutation
    const lineIndex = lineNum - 1
    return new Promise(resolve => {
      this.setState({
        textLines: utils.addHintToDeletedLine(textLines, lineIndex)
      }, () => {
        const delay = 2000
        setTimeout(
          () => this.setState({
            textLines: utils.removeElementAtIndex(textLines, lineIndex)
          }, resolve), delay
        )
      })
    })
  }

  applyMutation = mutation => {
    if(mutation.type === 'DELETE') return this.removeLine(mutation)
    return this.insertLine(mutation)
  }

  handleMutations = mutations => {
    utils.eachMutationPromise(mutations, this.applyMutation)
  }

  render() {
    const { textLines } = this.state
    const props = {
      className: 'line'
    }
    const innerTree = textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('div', props, t)
    })
    const mutations = patch.parse(this.props.patch)
    return (
      <div>
        {innerTree}
        <button onClick={() => this.handleMutations(mutations)}>
          handleMutations
        </button>
      </div>
    )
  }
}

export default Main

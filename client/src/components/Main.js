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
    const { textLines } = this.props
    let index = mutation.lineNum - 1
    const newTextLines = utils.insertEmptyLineAtIndex(textLines, index)
    this.setState({
      textLines: newTextLines
    })
    // 先开辟出新行来，然后在下面的代码中在新的空白行中逐渐添加字符
    return utils.eachPromise(mutation.text, this.typeCharacter, index)
  }

  insertOneLine = mutation => {
    this.props.insertLine(mutation)
  }

  applyMutation = mutation => {
    if(mutation.type === 'DELETE') return this.props.removeLine(mutation)
    return this.insertLine(mutation)
  }

  handleMutations = mutations => {
    utils.eachMutationPromise(mutations, this.applyMutation)
  }

  remove2Line = mutations => {
    utils.eachMutationPromise(mutations, this.props.removeLine)
  }

  render() {
    console.log('this.props.textLines..', this.props.textLines)
    const { textLines } = this.props
    const props = {
      className: 'line'
    }
    const innerTree = textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('div', props, t)
    })
    const mutations = patch.parse(this.props.patch)
    console.log(mutations)
    return (
      <div>
        {innerTree}
        {/* <button onClick={() => this.handleMutations(mutations)}> */}
        <button onClick={() => this.remove2Line(mutations.slice(0, 2))} >
          handleMutations
        </button>
        <button onClick={() => this.insertOneLine(mutations[3])} >
          insert line
        </button>
      </div>
    )
  }
}

export default Main

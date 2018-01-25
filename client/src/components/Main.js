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
    const mutation = { type: "ADD", text: "billie", lineNum: 3 }
    console.log(mutations[3])
    return (
      <div>
        {innerTree}
        {/* <button onClick={() => this.handleMutations(mutations)}> */}
        <button onClick={() => this.remove2Line(mutations.slice(0, 2))} >
          handleMutations
        </button>
        <button onClick={() => this.insertOneLine(mutation)} >
          insert line
        </button>
      </div>
    )
  }
}

export default Main

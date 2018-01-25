import React, { Component } from 'react'
import Editor from './Editor'
import '../assets/global.css'

class Main extends Component {
  render() {
    const { textLines } = this.props
    return (
      <div>
        <Editor textLines={textLines} />
        <button onClick={() => this.props.handleMutations()}>mutations</button>
      </div>
    )
  }
}

export default Main

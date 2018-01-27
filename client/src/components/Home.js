import React, { Component } from 'react'
import styled from 'styled-components'
import Editor from './Editor'

class Home extends Component {
  render() {
    const { textLines, file } = this.props
    return (
      <Wrap>
        <div>{this.props.file}</div>
        <Editor textLines={textLines} />
        <button onClick={() => this.props.handleMutations()}>mutations</button>
      </Wrap>
    )
  }
}

export default Home

const Wrap = styled.div``

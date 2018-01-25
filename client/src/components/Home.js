import React, { Component } from 'react'
import styled from 'styled-components'
import Editor from './Editor'
import io from 'socket.io-client'
const socket = io('http://localhost:3002')

class Home extends Component {
  componentDidMount() {
    socket.on('git commits', data => {
      console.log('git commits', data)
    })
  }
  render () {
    const { textLines } = this.props

    return (
      <Wrap>
        <Editor textLines={textLines} />
        <button onClick={() => this.props.handleMutations()}>mutations</button>
      </Wrap>
    )
  }
}

export default Home

const Wrap = styled.div``

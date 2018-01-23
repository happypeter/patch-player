import React, { Component } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import './patch.css'
import { SERVER_URL } from './Constants'


class Patch extends Component {
  state = {
    patch: []
  }

  componentDidMount = () => {
    const socket = io(SERVER_URL)
    socket.on('commit files', data => {
      this.setState({
        patch: []
      })
    });
    socket.on('file and patch', data => {
      this.setState({
        patch: data.file.patch ? data.file.patch.split('\n') : []
      })
    });
  }

  render() {
    const { patch } = this.state
    const content = patch.map((line, index) => {
      return <div key={index} dangerouslySetInnerHTML={{__html: line}} />
    })
    return (
      <Wrapper>
        {content}
      </Wrapper>
    )
  }
}

export default Patch

const Wrapper = styled.div`
  padding: 24px;
  flex-grow: 1;
  border: 1px solid #d8d8d8;
  padding: 0.5em 0;
  overflow: auto;
`

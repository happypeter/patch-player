import React, { Component } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'

class Patch extends Component {
  state = {
    patch: []
  }

  componentDidMount = () => {
    const socket = io('http://localhost:3000')
    socket.on('file and patch', data => {
      this.setState({
        patch: data.file.patch.split('\n')
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
`

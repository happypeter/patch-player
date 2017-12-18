import React, { Component } from 'react'
import styled from 'styled-components'
import Typist from '../typist/Typist'

import highlight from '../utils/highlight'
import './highlight.css'
import io from 'socket.io-client'

class App extends Component {
  state = {
    count: 0,
    file: [],
    fileName: '',
    patch: []
  }

  componentDidMount = () => {
    const socket = io('http://localhost:3000');
    socket.on('file content and patch', data => {
      console.log(data)
      this.setState({
        fileName: data.fileName,
        file: data.file,
        // patch: data.patch.lines
      })
    });
  }

  tick = () => {
    const {patch, count, file} = this.state
    if (count >= patch.length) return

    const cursors = document.getElementsByClassName('Cursor Cursor--blinking')
    if(cursors.length) {
      for(let i = 0; i < cursors.length; i++) {
        cursors[i].remove()
      }
    }

    const action = patch[count]
    const index = file.findIndex(line => line.lineNum === action.lineNum && !line.type)
    if (action.type === 'added') {
      action.text = action.text ? (
        <Typist>
          <span className='keyword'>import </span>
          <Typist.Delay ms={100} />
          <span className='tag'>hello</span>
        </Typist>
      ) : <Typist><pre> </pre></Typist>

      this.setState({
        file: [...file.slice(0, index), action, ...file.slice(index)],
        count: count + 1
      })
    } else if (action.type === 'deleted') {
      action.text = (
        <Typist>
          <span style={{color: 'blue'}}>{action.text}</span>
          <Typist.Backspace count={action.text.length} delay={200} />
        </Typist>
      )

      this.setState({
        file: [...file.slice(0, index), action, ...file.slice(index + 1)],
        count: count + 1
      })
    }

  }


  render() {
    const content = this.state.file.map((line, index) => {
      return (
        <div key={index}>
          {line.text && !line.type? <div dangerouslySetInnerHTML={{__html: highlight(line.text)}} /> : line.text}
        </div>
      )
    })

    return (
      <Wrap onClick={this.tick}>
        <Content>
          <div>{this.state.fileName}</div>
          {content}
        </Content>
      </Wrap>
    )
  }
}

export default App

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 900px;
  margin: 0 auto;
`

const Content = styled.div`
  height: 100%;
  padding: 10px;
  background-color: #fff;
  color: black;
`

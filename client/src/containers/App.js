import React, { Component } from 'react'
import styled from "styled-components"
import Typist from '../typist/Typist'
import axios from 'axios'

class App extends Component {
  state = {
    count: 0,
    file: [],
    patch: []
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
      action.text = (
        action.text ? <Typist><span style={{color: 'red'}}>{action.text}</span></Typist> : <Typist><pre> </pre></Typist>
      )

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

  componentDidMount() {
    const url = 'http://localhost:3000/files/a'
    axios.get(url)
      .then(res => {
        this.setState({
          file: res.data.file,
          patch: res.data.patch.lines
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <Wrap onClick={this.tick}>
        <Content>
          {
            this.state.file.map((line, index) => {
              return (
                <div key={index}>
                  {line.text ? line.text : <br />}
                </div>
              )
            })
          }
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
  width: 600px;
  margin: 0 auto;
`

const Content = styled.div`
  height: 100%;
  margin: 10px;
  padding: 10px;
  border: 1px solid red;
`

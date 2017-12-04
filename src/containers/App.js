import React, { Component } from 'react'
import styled from "styled-components"


// 思路
// 用带代码高亮的 div
// https://github.com/jstejada/react-typist/blob/master/src/Backspace.jsx

class App extends Component {
  componentDidMount() {
    var typed = new Typed(".element", options);
  }


  render () {
    return (
      <Wrap onClick={this.tick}>
        <div className='element'></div>
      </Wrap>
    )
  }
}

export default App

const Wrap = styled.div`
  height: 100vh;
  border: 2px solid red;
`
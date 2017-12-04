import React, { Component } from 'react'
import styled from "styled-components"
import Typed from 'typed.js';

var options = {
  strings: ["<i>First</i> sentence.", "&amp; a second sentence."],
  typeSpeed: 40
}


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
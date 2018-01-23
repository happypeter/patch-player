import React, { Component } from 'react'
import * as utils from '../utils/'


class App extends Component {
  state = {
    textLines: [
      'the first line',
      'the second line',
      'the third line'
    ],
    newTextLine: ''
  }

  typeCharacter = character => {
    return new Promise((resolve) => {
      let newTextLine = this.state.newTextLine + character
      this.setState({ newTextLine }, () => {
        const delay = 100
        setTimeout(resolve, delay);
      })
    })
  }

  typeLine = line => {
    utils.eachPromise(line, this.typeCharacter)
  }

  componentDidMount() {
    this.typeLine('hey, people')
  }

  render() {
    const { newTextLine, textLines } = this.state
    const allText = [...textLines, newTextLine]
    const props = {
      className: 'line'
    }
    const innerTree = allText.map(
      (t, i) => {
        props.key = Math.random()
        return  React.createElement('div', props, t)
      }
    )
    return <div>{innerTree}</div>
  }
}

export default App

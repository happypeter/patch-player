import React, { Component } from 'react'
import * as utils from '../utils/'
class App extends Component {
  state = {
    textLine: ''
  }

  typeCharacter = character => {
    let { textLine } = this.state
    return new Promise((resolve) => {
      textLine += character
      this.setState({ textLine }, () => {
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
    const { textLine } = this.state
    const props = {
      className: 'highlight',
      key: 'uid'
    }
    const innerTree = React.createElement('div', props, textLine)
    return <div>{innerTree}</div>
  }
}

export default App

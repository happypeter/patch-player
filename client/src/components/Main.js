import React, { Component } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import '../assets/global.css'

class Main extends Component {
  componentDidUpdate() {
    Prism.highlightAll()
  }

  render() {
    const { textLines } = this.props
    const props = {
      className: 'language-jsx'
    }
    const innerTree = textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('code', props, t)
    })
    return (
      <div>
        {innerTree}
        <button onClick={() => this.props.handleMutations()}>mutations</button>
      </div>
    )
  }
}

export default Main

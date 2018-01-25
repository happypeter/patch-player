import React, { Component } from 'react'

class Main extends Component {
  render() {
    const { textLines } = this.props
    const props = {
      className: 'line'
    }
    const innerTree = textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('div', props, t)
    })
    return (
      <div>
        {innerTree}
        <button onClick={() => this.props.handleMutations()}>
          mutations
        </button>
      </div>
    )
  }
}

export default Main

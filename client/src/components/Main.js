import React, { Component } from 'react'
import * as utils from '../utils/'
import * as patch from '../utils/patch'

class Main extends Component {
  applyMutation = mutation => {
    if(mutation.type === 'DELETE') return this.props.removeLine(mutation)
    return this.props.insertLine(mutation)
  }

  handleMutations = mutations => {
    utils.eachMutationPromise(mutations, this.applyMutation)
  }

  render() {
    const { textLines } = this.props
    const props = {
      className: 'line'
    }
    const innerTree = textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('div', props, t)
    })
    const mutations = patch.parse(this.props.patch)
    return (
      <div>
        {innerTree}
        <button onClick={() => this.handleMutations(mutations)}>
          mutations
        </button>
      </div>
    )
  }
}

export default Main

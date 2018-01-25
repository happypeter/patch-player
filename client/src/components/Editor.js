import React, { Component } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

class HighLight extends Component {
  componentDidUpdate() {
    Prism.highlightAll()
  }

  render () {
    const props = {
      className: 'language-jsx'
    }
    const innerTree = this.props.textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('code', props, t)
    })
    return (
      <Wrap>
        {innerTree}
      </Wrap>
    )
  }
}

export default HighLight

const Wrap = styled.div``

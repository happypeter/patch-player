import React, { Component } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import CodeStyle from './EditorCode'

class HighLight extends Component {
  componentDidUpdate() {
    Prism.highlightAll()
  }

  render() {
    return (
      <Wrap id={this.props.id}>
        <CodeStyle>{this.props.file}</CodeStyle>
      </Wrap>
    )
  }
}

export default HighLight

const Wrap = styled.div`
  background: #1d1f27;
  font-size: 14px;
  overflow: auto;
  padding: 16px;
  line-height: 1.8;
  flex-grow: 1;
  color: #fff;
`

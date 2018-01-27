import React, { Component } from 'react'
import styled from 'styled-components'
import { markupPatch } from '../utils/patch'

class Patch extends Component {
  render() {
    const { patch } = this.props
    const content = markupPatch(patch)
      .split('\n')
      .map((line, index) => {
        return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      })
    return <Wrap>{content}</Wrap>
  }
}

export default Patch

const Wrap = styled.div`
  padding: 24px;
  flex-grow: 1;
  border: 1px solid #d8d8d8;
  padding: 0.5em 0;
  overflow: auto;
  pre {
    margin: 0;
    font-family: 'Bitstream Vera Sans Mono', Courier, monospace;
    font-size: 12px;
    line-height: 2em;
    text-indent: 0.5em;
  }
  .info {
    color: #a0b;
  }
  .delete {
    background-color: #fdd;
  }
  .insert {
    background-color: #dfd;
  }
`

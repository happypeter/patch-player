import React, { Component } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import CodeStyle from './EditorCode'
import { animateScroll as scroll } from 'react-scroll'
import { LINE_HEIGHT } from '../constants/Editor'

class HighLight extends Component {
  componentDidMount() {
    const height = document.getElementById('scroll-container').clientHeight
    this.props.setScrollContainerHeight(height)
  }

  componentDidUpdate() {
    Prism.highlightAll()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position.offset !== this.props.position.offset) {
      scroll.scrollMore(nextProps.position.toY, {
        containerId: 'scroll-container',
        duration: 3000
      })
    }
  }

  render() {
    return (
      <Wrap id="scroll-container">
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

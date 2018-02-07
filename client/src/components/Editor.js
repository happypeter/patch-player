import React, { Component } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import CodeStyle from './EditorCode'
import { animateScroll as scroll } from 'react-scroll'
import PropTypes from 'prop-types'
import { LINE_HEIGHT } from '../constants/Editor'

const propTypes = {
  position: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    editorHeight: PropTypes.number.isRequired
  }),
  file: PropTypes.string.isRequired
}

class HighLight extends Component {
  componentDidMount() {
    // const height = document.getElementById('scroll-container').clientHeight
    const height = 20 // FIXME: 暂时把编辑器视窗设置成固定的 20行 高
    this.props.setEditorHeight(height)
  }

  componentDidUpdate() {
    Prism.highlightAll()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position.offset !== this.props.position.offset) {
      const { toY } = nextProps.position
      scroll.scrollMore(toY * LINE_HEIGHT, {
        containerId: 'scroll-container',
        duration: 2000
      })
    }
  }

  render() {
    return (
      <Wrap
        editorHeight={this.props.position.editorHeight}
        id="scroll-container"
      >
        <CodeStyle>{this.props.file}</CodeStyle>
      </Wrap>
    )
  }
}

HighLight.propTypes = propTypes

export default HighLight

const Wrap = styled.div`
  background: #1d1f27;
  overflow: hidden;
  border: 1px solid red;
  height: ${props => props.editorHeight * 20}px;
  color: #fff;
`

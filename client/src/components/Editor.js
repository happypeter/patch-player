import React, { Component } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import CodeStyle from './EditorCode'
import { animateScroll as scroll } from 'react-scroll'
import PropTypes from 'prop-types'
import { LINE_HEIGHT, EDITOR_BG } from '../constants/Editor'

const propTypes = {
  position: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    editorHeight: PropTypes.number.isRequired
  }),
  fileContent: PropTypes.string.isRequired
}

class HighLight extends Component {
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
        <CodeStyle>{this.props.fileContent}</CodeStyle>
      </Wrap>
    )
  }
}

HighLight.propTypes = propTypes

export default HighLight

const Wrap = styled.div`
  background: ${EDITOR_BG};
  border: 1px solid red;
  overflow: hidden;
  height: ${props => props.editorHeight * LINE_HEIGHT}px;
  color: #fff;
`

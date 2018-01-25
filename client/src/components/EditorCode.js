import React, { Component } from 'react'
import styled from 'styled-components'

class Code extends Component {
  render () {
    return (
      <Wrap>
        {this.props.children}
      </Wrap>
    )
  }
}

export default Code

const Wrap = styled.div`
  code {
    display: block;
  }
  
  .keyword {
    color: #00bcd4;
  }

  .token.string {
    color: #ff4081;
  }
`

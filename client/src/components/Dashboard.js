import React, { Component } from 'react'
import styled from 'styled-components'

class Dashboard extends Component {
  render () {
    return (
      <Wrap>
        <button onClick={this.props.setProjectPath}>
          选择项目
        </button>
      </Wrap>
    )
  }
}

export default Dashboard

const Wrap = styled.div``

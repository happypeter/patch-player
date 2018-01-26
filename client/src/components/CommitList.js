import React, { Component } from 'react'
import styled from 'styled-components'

class CommitList extends Component {
  render() {
    const { commits } = this.props
    let commitList = []
    if (commits.length) {
      commitList = commits.map((commit, index) => {
        return <div key={index}>{commit}</div>
      })
    }
    return (
      <Wrap>
        {commitList}
      </Wrap>
    )
  }
}

export default CommitList

const Wrap = styled.div``

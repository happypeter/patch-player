import React, { Component } from 'react'
import styled from 'styled-components'

class CommitList extends Component {
  handleClick = (commit) => {
    console.log('commit', commit)
    this.props.selectCommit(commit, this.props.repo)
  }

  render() {
    const { commits } = this.props
    let commitList = []
    if (commits.length) {
      commitList = commits.map((commit, index) => {
        return <Commit key={index} onClick={() => this.handleClick(commit)}>{commit}</Commit>
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

const Commit = styled.div`
  cursor: pointer;
`

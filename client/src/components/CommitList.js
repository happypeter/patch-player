import React, { Component } from 'react'
import styled from 'styled-components'

class CommitList extends Component {
  state = {
    selectedId: ''
  }

  handleClick = (commit, index) => {
    this.setState({ selectedId: index })
    this.props.selectCommit(commit, this.props.repo)
  }

  render() {
    const { commits } = this.props
    let commitList = []
    if (commits.length) {
      commitList = commits.map((commit, index) => {
        return (
          <Commit
            key={index}
            active={index === this.state.selectedId}
            onClick={() => this.handleClick(commit, index)}
          >
            {commit.length > 30 ? commit.slice(0, 30) + '...' : commit}
          </Commit>
        )
      })
    }
    return <Wrap>{commitList}</Wrap>
  }
}

export default CommitList

const Wrap = styled.div`
  background-color: #efefef;
  overflow-y: auto;
`

const Commit = styled.div`
  cursor: pointer;
  padding: 8px;
  color: #2e444e;
  margin: 8px 16px;
  font-size: 14px;
  background: ${props => (props.active ? '#1414141a' : '')};
  &:hover {
    background-color: #1414141a;
  }
`

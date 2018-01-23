import React, { Component } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
import { SERVER_URL } from './Constants'
const socket = io(SERVER_URL)

class Sidebar extends Component {
  state = {
    commits: [],
    selectedId: ''
  }

  componentDidMount = () => {
    socket.on('git commits', data => {
      this.setState({commits: data.commits})
    });
  }

  handleClick = (item, index) => {
    this.setState({selectedId: index})
    const commit = item.split('--')[0]
    sessionStorage.setItem('commit', commit)
    socket.emit('commit', {commit, repo: sessionStorage.getItem('repo')});
  }

  render() {
    const { commits } = this.state
    const commitList = commits.map((item, index) => {
      return (
        <Commit
          key={index}
          active={index === this.state.selectedId}
          onClick={this.handleClick.bind(this, item, index)}
        >
          {item.length > 20 ? item.slice(0, 30) + '...' : item}
        </Commit>
      )
    })

    return (
      <Wrapper>
        {commitList}
      </Wrapper>
    )
  }
}

export default Sidebar

const Commit = styled.div`
  cursor: pointer;
  padding: 8px;
  color: #2e444e;
  margin: 8px 16px;
  font-size: 14px;
  background: ${props => props.active ? '#1414141a' : ''};
  &:hover {
    background-color: #1414141a;
  }
`

const Wrapper = styled.div`
  background-color: #efefef;
  overflow-y: auto;
`

import React, { Component } from 'react'
import './sidebar.css'
import styled from 'styled-components'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

class Sidebar extends Component {
  state = {
    commits: []
  }

  componentDidMount = () => {
    socket.on('git commits', data => {
      this.setState({commits: data.commits})
    });
  }

  handleClick = (item) => {
    const commit = item.split('--')[0]
    sessionStorage.setItem('commit', commit)
    socket.emit('commit', {commit, repo: sessionStorage.getItem('repo')});
  }

  render() {
    const commitList = this.state.commits.map((item, index) => {
      return <Div key={index} onClick={this.handleClick.bind(this, item)}>{item}</Div>
    })

    return (
      <div className='sidebar'>
        {commitList}
      </div>
    )
  }
}

export default Sidebar

const Div = styled.div`
  cursor: pointer;
  padding: 8px;
`

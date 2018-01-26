import React, { Component } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
const socket = io('http://localhost:3002')

class Dashboard extends Component {
  // TODO: 选择项目，项目文件夹传递给后端 express 代码
  // TODO: 启动/暂停代码播放
  state = {
    repo: ''
  }
  
  componentDidMount() {
    socket.on('git commits', data => {
      this.props.loadCommits(data.commits)
    })
  }

  handlePathChange = e => {
    this.setState({
      repo: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { repo } = this.state
    socket.emit('repo', { repo })
    this.setState({
      repo: ''
    })
  }

  render() {
    console.log('Dashboard commits....', this.props.commits)
    return (
      <Wrap>
        <input value={this.state.repo} onChange={this.handlePathChange} />
        <button onClick={this.handleSubmit}>提交</button>
      </Wrap>
    )
  }
}

export default Dashboard

const Wrap = styled.div``

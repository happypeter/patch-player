import React, { Component } from 'react'
import styled from 'styled-components'
import CommitList from './CommitList'
import socket from '../utils/socket'

class Dashboard extends Component {
  // TODO: 选择项目，项目文件夹传递给后端 express 代码
  // TODO: 启动/暂停代码播放
  
  state = {
    repo: this.props.git.repo
  }
  
  componentDidMount() {
    socket.on('git commits', data => {
      this.props.loadCommits(data.commits)
    })
  }

  handlePathChange = e => {
    const repo = e.target.value
    this.setState({ repo })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { repo } = this.state
    this.props.setRepo(repo.trim())
    this.setState({ repo: '' })
  }

  render() {
    return (
      <Wrap>
        <Input value={this.state.repo} onChange={this.handlePathChange} />
        <button onClick={this.handleSubmit}>提交</button>
        <CommitList commits={this.props.git.commits} />
      </Wrap>
    )
  }
}

export default Dashboard

const Wrap = styled.div``

const Input = styled.input`
  width: 300px;
`

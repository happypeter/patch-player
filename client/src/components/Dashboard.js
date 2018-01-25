import React, { Component } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
const socket = io('http://localhost:3002')

class Dashboard extends Component {
  // TODO: 选择项目，项目文件夹传递给后端 express 代码
  // TODO: 启动/暂停代码播放
  componentDidMount() {
    socket.on('git commits', data => {
      console.log('git commits', data)
    })
  }
  handleClick = (e) => {
    socket.emit('repo', {repo: 'patch-typist'})
  }
  render () {
    return (
      <Wrap>
        <button onClick={this.handleClick}>socket</button>
        <button onClick={this.props.setProjectPath}> 选择项目
        </button>
      </Wrap>
    )
  }
}

export default Dashboard

const Wrap = styled.div``

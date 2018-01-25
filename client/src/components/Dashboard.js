import React, { Component } from 'react'
import styled from 'styled-components'

class Dashboard extends Component {
  // TODO: 选择项目，项目文件夹传递给后端 express 代码
  // TODO: 启动/暂停代码播放
  render () {
    return (
      <Wrap>
        <button onClick={this.props.setProjectPath}> 选择项目
        </button>
      </Wrap>
    )
  }
}

export default Dashboard

const Wrap = styled.div``

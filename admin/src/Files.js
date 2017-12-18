import React, { Component } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

class Files extends Component {
  state = {
    files: [],
    changed: []
  }

  componentDidMount = () => {
    socket.on('commit files', data => {
      this.setState({
        files: data.files,
        changed: data.changed
      })
    });
  }

  handleClick = (file) => {
    const commit = sessionStorage.getItem('commit')
    const repo = sessionStorage.getItem('repo')
    socket.emit('file', {file, commit, repo});
  }

  render() {
    const fileList = this.state.files.map((file, index) => {
      if (this.state.changed.includes(file)) {
        return <Changed key={index} onClick={this.handleClick.bind(this, file)}>{file}</Changed>
      }
      return <Unchanged key={index} onClick={this.handleClick.bind(this, file)}>{file}</Unchanged>
    })

    return (
      <div className='sidebar'>
        {fileList}
      </div>
    )
  }
}

export default Files

const Changed = styled.div`
  color: red;
  cursor: pointer;
  padding: 8px;
`

const Unchanged = styled.div`
  color: black;
  cursor: pointer;
  padding: 8px;
`

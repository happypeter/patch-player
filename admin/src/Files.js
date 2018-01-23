import React, { Component } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
import { SERVER_URL } from './Constants'
const socket = io(SERVER_URL)

class Files extends Component {
  state = {
    files: [],
    changed: [],
    selectedId: ''
  }

  componentDidMount = () => {
    socket.on('commit files', data => {
      this.setState({
        files: data.files,
        changed: data.changed,
        selectedId: ''
      })
    });
  }

  handleClick = (file, status, index) => {
    this.setState({selectedId: index})
    const commit = sessionStorage.getItem('commit')
    const repo = sessionStorage.getItem('repo')
    socket.emit('file', {file, status, commit, repo});
  }

  render() {
    const { changed, files } = this.state
    const fileList = files.map((file, index) => {
      const include = changed.find(item => item.file === file)
      if (include) {
        return (
          <Changed
            key={index}
            active={index === this.state.selectedId}
            onClick={this.handleClick.bind(this, file, include.status, index)}
          >
            {file} -- {include.status}
          </Changed>
        )
      }
      return (
        <Unchanged
          key={index}
          active={index === this.state.selectedId}
          onClick={this.handleClick.bind(this, file, 'K', index)}
        >
          {file}
        </Unchanged>
      )
    })

    return (
      <Wrapper>
        {fileList}
      </Wrapper>
    )
  }
}

export default Files

const Changed = styled.div`
  color: #ff4081;
  cursor: pointer;
  padding: 8px;
  margin: 8px 16px;
  font-size: 14px;
  background: ${props => props.active ? '#1414141a' : ''};
  &:hover {
    background-color: #1414141a;
  }
`

const Unchanged = styled.div`
  color: black;
  cursor: pointer;
  padding: 8px;
  margin: 8px 16px;
  font-size: 14px;
  color: #2e444e;
  background: ${props => props.active ? '#1414141a' : ''};
  &:hover {
    background-color: #1414141a;
  }
`

const Wrapper = styled.div`
  background-color: #efefef;
  overflow-y: auto;
  flex-shrink: 0;
`

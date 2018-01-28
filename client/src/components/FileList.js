import React, { Component } from 'react'
import styled from 'styled-components'

class FileList extends Component {
  handleClick = (file, status, index) => {
    const { commit, repo } = this.props.git
    this.props.selectFile({ file, status, commit: commit.slice(0, 7), repo })
  }

  render() {
    const { changedFiles, files } = this.props.git
    const fileList = files.map((file, index) => {
      const result = changedFiles.find(item => item.file === file)
      if (result) {
        return (
          <Changed
            key={index}
            active={file === this.props.git.file}
            onClick={() => {
              this.handleClick(file, result.status, index)
            }}
          >
            {file} -- {result.status}
          </Changed>
        )
      }
      return (
        <Unchanged
          key={index}
          active={file === this.props.git.file}
          onClick={() => {
            this.handleClick(file, 'K', index)
          }}
        >
          {file}
        </Unchanged>
      )
    })

    return <Wrap>{fileList}</Wrap>
  }
}

export default FileList

const Wrap = styled.div`
  background-color: #efefef;
  overflow-y: auto;
  flex-shrink: 0;
`

const Changed = styled.div`
  color: #ff4081;
  cursor: pointer;
  padding: 8px;
  margin: 8px 16px;
  font-size: 14px;
  background: ${props => (props.active ? '#1414141a' : '')};
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
  background: ${props => (props.active ? '#1414141a' : '')};
  &:hover {
    background-color: #1414141a;
  }
`

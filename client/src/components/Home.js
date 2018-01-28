import React, { Component } from 'react'
import styled from 'styled-components'
import Editor from './Editor'

class Home extends Component {
  render() {
    const { file, fileName } = this.props
    return (
      <Wrap>
        <Content>
          <FileTabs>
            <FileTab>{fileName}</FileTab>
          </FileTabs>
          <Editor file={file} />
          <Button onClick={() => this.props.handleMutations()}>开始打印</Button>
        </Content>
      </Wrap>
    )
  }
}

export default Home

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #282a36;
  color: #f8f8f2;
`

const Content = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const FileTabs = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #00bcd4;
  flex-shrink: 0;
`

const FileTab = styled.div`
  margin: 12px 12px 0;
  padding: 10px;
  background: ${props => (props.active ? '#00bcd4' : '')};
  &:hover {
    background: #00bcd4;
    cursor: pointer;
  }
  &:first-child {
    margin-left: 0;
  }
`

const Button = styled.button`
  width: 200px;
  height: 48px;
  color: #212121;
  background-color: #f3b661;
  border: none;
  margin-top: 16px;
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
`

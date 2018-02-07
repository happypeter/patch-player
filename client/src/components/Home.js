import React, { Component } from 'react'
import styled from 'styled-components'
import Editor from './Editor'
import PropTypes from 'prop-types'

const propTypes = {
  fileContent: PropTypes.string.isRequired
}
class Home extends Component {
  componentDidMount() {
    sessionStorage.setItem('mode', 'slave')
  }

  render() {
    const { fileContent, fileName, position } = this.props
    return (
      <Wrap>
        <Content>
          <FileTabs>
            <FileTab>{fileName}</FileTab>
          </FileTabs>
          <Editor fileContent={fileContent} position={position} />
        </Content>
      </Wrap>
    )
  }
}

Home.propTypes = propTypes

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
  margin-bottom: 20px;
  border-bottom: 1px solid #00bcd4;
  height: 60px;
  flex-shrink: 0;
  font-size: 25px;
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

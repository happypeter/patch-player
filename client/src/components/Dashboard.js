import React, { Component } from 'react'
import styled from 'styled-components'
import CommitList from './CommitList'
import FileList from './FileList'
import Patch from './Patch'
import PropTypes from 'prop-types'

const propTypes = {
  handleMutations: PropTypes.func.isRequired
}

class Dashboard extends Component {
  componentDidMount() {
    sessionStorage.setItem('mode', 'master')
  }

  state = {
    repo: this.props.git.repo
  }

  handlePathChange = e => {
    const repo = e.target.value
    this.setState({ repo })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { repo } = this.state
    this.props.setRepo(repo.trim())
  }

  handleClick = () => {
    this.props.handleMutations()
  }

  render() {
    const { commits, repo } = this.props.git
    return (
      <Wrap>
        <Form onSubmit={this.handleSubmit}>
          <Input value={this.state.repo} onChange={this.handlePathChange} />
          <Button type="submit">提交</Button>
        </Form>
        <PrintButton onClick={this.handleClick}>开始打印</PrintButton>
        <Content>
          <CommitList
            commits={commits}
            repo={repo}
            selectCommit={this.props.selectCommit}
          />
          <FileList git={this.props.git} selectFile={this.props.selectFile} />
          <Patch patch={this.props.patch} />
        </Content>
      </Wrap>
    )
  }
}

Dashboard.propTypes = propTypes

export default Dashboard

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Form = styled.form`
  height: 100px;
  background-color: #00bcd4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const Input = styled.input`
  width: 450px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
`

const Button = styled.button`
  width: 60px;
  height: 40px;
  border-radius: 20px;
  background-color: #f3b661;
  color: #212121;
  font-size: 14px;
  margin-left: 8px;
  flex-shrink: 0;
  cursor: pointer;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow-y: hidden;
`

const PrintButton = styled.button`
  width: 200px;
  height: 48px;
  color: #212121;
  background-color: #f3b661;
  border: none;
  margin-top: 16px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 16px;
  flex-shrink: 0;
`

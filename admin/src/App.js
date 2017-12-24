import React, { Component } from 'react';
import io from 'socket.io-client';
import Sidebar from './Sidebar'
import Files from './Files'
import Patch from './Patch'
import styled from 'styled-components'

class App extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const repo = this.input.value
    sessionStorage.setItem('repo', repo)
    const socket = io('http://localhost:3000')
    socket.emit('repo', {repo: repo});
  }

  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Input
            defaultValue={sessionStorage.repo}
            placeholder='path/to/repo'
            innerRef={el => this.input = el}
          />
          <Button type='submit'>提交</Button>
        </Form>
        <Bottom>
          <Sidebar />
          <Files />
          <Patch />
        </Bottom>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
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
  width: 350px;
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
`

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow-y: hidden;
`

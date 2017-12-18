import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
import Sidebar from './Sidebar'
import Files from './Files'

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
      <div className='app'>
        <Sidebar />
        <form onSubmit={this.handleSubmit} className='app-form'>
          <input ref={el => this.input = el} />
          <button type='submit'>提交</button>
        </form>
        <Files />
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

if (sessionStorage.repo) {
  const socket = io('http://localhost:3000')
  socket.emit('repo', {repo: sessionStorage.repo});
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

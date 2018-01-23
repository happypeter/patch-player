import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import { SERVER_URL } from './Constants'


if (sessionStorage.repo) {
  const socket = io(SERVER_URL)
  socket.emit('repo', {repo: sessionStorage.repo});
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

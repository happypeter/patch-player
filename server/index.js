const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const git = require('./git-cmd')

io.on('connection', socket => {
  socket.on('repo', data => {
    const repo = data.repo
    git.log(repo)
      .then(result => {
        if (!result) {
          console.log('no commits')
        }
        socket.broadcast.emit('git commits', {commits: result.split('\n')})
      })
  })
})

server.listen(3002, () => {
  console.log('running on port 3002...')
})

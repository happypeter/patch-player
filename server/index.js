const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', socket => {
  socket.on('repo', data => {
    const repo = data.repo
    socket.broadcast.emit('git commits', {commits: 'commits'})
  })
})

server.listen(3002, () => {
  console.log('running on port 3002...')
})

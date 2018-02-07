const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const git = require('./git-cmd')
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())

io.on('connection', socket => {
  socket.on('action', action => {
    socket.broadcast.emit('action', action)
  })
})

app.post('/commits', (req, res) => {
  git.log(req.body.repo).then(result => {
    if (!result) {
      console.log('no commits')
    }
    res.json({ commits: result.split('\n') })
  })
})

app.post('/file-detail', (req, res) => {
  let source = req.body
  Promise.all([git.showFileContent(source), git.showFilePatch(source)])
    .then(result => {
      res.json({
        content: result[0],
        patch: result[1],
        file: source.file
      })
    })
    .catch(error => {
      console.log(error)
    })
})

app.post('/commit-detail', (req, res) => {
  console.log('', req.body)
  let source = req.body
  Promise.all([git.lsTree(source), git.diffTree(source)])
    .then(result => {
      let changedFiles = []
      if (result[1]) {
        changedFiles = result[1]
          .trim()
          .split('\n')
          .map(item => {
            const arr = item.split(/\s/)
            return { status: arr[0], file: arr[1] }
          })
      }
      let files = result[0].split('\n')
      res.json({ files, changedFiles })
    })
    .catch(error => {
      console.log(error)
    })
})

server.listen(3002, () => {
  console.log('running on port 3002...')
})

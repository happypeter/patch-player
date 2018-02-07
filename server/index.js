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
  socket.on('repo', data => {
    console.log(data.repo)
    const repo = data.repo
    git.log(repo).then(result => {
      if (!result) {
        console.log('no commits')
      }
      socket.broadcast.emit('git commits', { commits: result.split('\n') })
    })
  })

  socket.on('commit', source => {
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

        socket.broadcast.emit('commit files', {
          files: result[0].split('\n'),
          changedFiles
        })
      })
      .catch(error => {
        console.log(error)
      })
  })

  socket.on('action', action => {
    console.log('hello action---', action)
    socket.broadcast.emit('action', action)
  })

  socket.on('file', source => {
    Promise.all([git.showFileContent(source), git.showFilePatch(source)])
      .then(result => {
        console.log(result[1])
        const content = socket.broadcast.emit('file content and patch', {
          content: result[0],
          patch: result[1],
          file: source.file
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
})

app.post('/commits', (req, res) => {
  console.log('/commits here', req.body)
  git.log(req.body.repo).then(result => {
    if (!result) {
      console.log('no commits')
    }
    res.json({ commits: result.split('\n') })
  })
})
server.listen(3002, () => {
  console.log('running on port 3002...')
})

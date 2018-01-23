const express = require('express')
const app = express()
const logger = require('morgan')

const socketIo = require('socket.io')
const http = require('http')

const git = require('./utils/git-cmd')
const parser = require('./utils/parser')
const language = require('./utils/language')
const cors = require('cors');

app.use(cors());

const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', socket => {
  socket.on('repo', source => {
    const repo = source.repo
    git.log(repo)
      .then(data => {
        if (!data) {
          console.log("No Commits")
          return
        }
        socket.broadcast.emit('git commits', {commits: data.split('\n')});
      })
      .catch(error => {
        if (error.code === 129) {
          process.stderr.write("Error: Not a git repository\n")
          return
        }
        process.stderr.write(error.message)
        return
      })
  })

  socket.on('commit', source => {
    Promise.all([
      git.lsTree(source),
      git.diffTree(source)
    ])
      .then(result => {
        let changed = []
        if (result[1]) {
          changed = result[1].trim().split('\n').map(item => {
            const arr = item.split(/\s/)
            return {status: arr[0], file: arr[1]}
          })
        }

        socket.broadcast.emit('commit files', {
          files: result[0].split('\n'),
          changed
        })
      })
      .catch(error => {
        console.log(error)
      })
  })

  socket.on('file', source => {
    Promise.all([
      git.showFileContent(source),
      git.showFilePatch(source)
    ])
      .then(result => {
        let content = []
        if (result[0]) {
          content = result[0].split('\n')
            .map((line, index) => {
              return {
                text: line,
                lineNum: index + 1
              }
            })
        }

        // admin system
        socket.broadcast.emit('file and patch', {
          file: {
            name: source.file,
            content,
            patch: result[1] ? parser.markUpDiff(result[1]) : null
          }
        });
        // client end
        socket.broadcast.emit('file content and patch', {
          commit: source.commit,
          file: {
            language: language(source.file, result[0]),
            name: source.file,
            content,
            patch: result[1] ? parser.diff(result[1]) : null
          }
        });
      })
      .catch(error => {
        console.log(error)
      })
  })
})

app.use(logger('dev'))

app.use(function(err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500);
  res.json({success: false, error: err.message })
})

server.listen(3008, () => {
  console.log(`running on port 3008...`)
})

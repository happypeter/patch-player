const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const parser = require('./utils/parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'))

const router = express.Router()

router.get('/files/:name', (req, res, next) => {
  const name = req.params.name
  const file = fs.readFileSync(`../../repo/${name}`, 'utf8')
    .split('\n')
    .map((line, index) => {
      return {
        text: line,
        lineNum: index + 1
      }
    })

  const diff = fs.readFileSync(`../../repo/${name}.patch`, 'utf8')
  return res.status(200).json({
    file,
    patch: parser(diff)
  })
})


app.use(cors(), router)

app.use(function(err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500);
  res.json({success: false, error: err.message })
})

app.listen(3000, () => {
  console.log(`running on port 3000...`)
})

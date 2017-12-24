const { spawn } = require('child_process')

exports.log = (repo) => {
  const args = ['log', '--pretty=format:%h--%s', 'master']
  return cmd(args, repo)
}

exports.lsTree = (data) => {
  const args = ['ls-tree', '--name-only', '-r', data.commit]
  return cmd(args, data.repo)
}

exports.diffTree = (data) => {
  const args = ['diff-tree', '--name-status', '--no-commit-id', '-r', data.commit]
  return cmd(args, data.repo)
}

exports.showFilePatch = (data) => {
  // K 表示在版本中没有变动的文件
  if (data.status === 'K') return
  const args = ['show', '--pretty=format:%b', data.commit, data.file]
  return cmd(args, data.repo)
}

exports.showFileContent = (data) => {
  let args = []
  // A 表示新建的文件
  if (data.status === 'A') return
  // M 表示更改的文件
  if (data.status === 'M') {
    args = ['show', `${data.commit}^:${data.file}`]
  } else if (data.status === 'K') {
    args = ['show', `${data.commit}:${data.file}`]
  }

  return cmd(args, data.repo)
}

function cmd(args, repo, fn) {
  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    let child = spawn('git', args, {cwd: repo})

    child.stdout.on('data', function(chunk) {
      stdout += chunk
    })
    child.stderr.on('data', function(chunk) {
      stderr += chunk
    })
    child.on('close', function(code) {
      if (code !== 0) {
        let error = new Error(stderr)
        error.code = code
        reject(error)
      } else if (!stdout.length) {
        resolve(null)
      } else {
        resolve(stdout)
      }
    })
  })
}

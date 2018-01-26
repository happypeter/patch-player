const { spawn } = require('child_process')

exports.log = repo => {
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

const cmd = (args, repo, fn) => {
  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    let child = spawn('git', args, { cwd: repo })

    child.stdout.on('data', function (chunk) {
      stdout += chunk
    })
    child.stderr.on('data', function (chunk) {
      stderr += chunk
    })
    child.on('close', function (code) {
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

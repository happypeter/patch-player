function language(file, content) {
  const extensions = {
    js: 'javascript',
    md: 'markdown',
    xml: 'markup',
    html: 'markup',
    svg: 'markup',
    gitignore: 'git',
    sh: 'bash'
  }
  let language
  const extension = (file.match(/\.(\w+)$/) || [, ''])[1]

  const reg = /\s*import\s+React\s+/

  if (extension === 'js') {
    language = reg.test(content) ? 'jsx' : 'js'
  } else {
    language = extensions[extension] || extension
  }

  return language
}

module.exports = language

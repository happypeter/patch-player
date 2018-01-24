import React, { Component } from 'react'
import * as utils from '../utils/'
import * as patch from '../utils/patch'

class Main extends Component {
  state = {
    textLines: ['the first line', 'the second line', 'the third line']
  }

  typeCharacter = (character, index) => {
    return new Promise(resolve => {
      let textLines = utils.insertCharacterAtIndex(
        this.state.textLines,
        character,
        index
      )
      this.setState({ textLines }, () => {
        const delay = 100
        setTimeout(resolve, delay)
      })
    })
  }

  insertLine = mutation => {
    const { textLines } = this.state
    let index = mutation.lineNum - 1
    const newTextLines = utils.insertEmptyLineAtIndex(textLines, index)
    this.setState({
      textLines: newTextLines
    })
    // 先开辟出新行来，然后在下面的代码中在新的空白行中逐渐添加字符
    return utils.eachPromise(mutation.text, this.typeCharacter, index)
  }

  removeLine = lineIndex => {
    const { textLines } = this.state
    this.setState({
      textLines: utils.addHintToDeletedLine(textLines, lineIndex)
    })
    setTimeout(
      () =>
        this.setState({
          textLines: utils.removeElementAtIndex(textLines, lineIndex)
        }),
      2000
    )
  }

  handleInsert = () => {
    const mutations = [
      {
        type: 'ADD',
        text: 'hello1',
        lineNum: 3
      },
      {
        type: 'ADD',
        text: 'hello2',
        lineNum: 4
      }
    ]
    this.insertLine(mutations[0]).then(
      () => this.insertLine(mutations[1])
    )
  }

  handleRemove = () => {
    const REMOVED_LINE_INDEX = 0
    this.removeLine(REMOVED_LINE_INDEX)
  }

  render() {
    const { textLines } = this.state
    const props = {
      className: 'line'
    }
    const innerTree = textLines.map((t, i) => {
      props.key = Math.random()
      return React.createElement('div', props, t)
    })
    console.log(patch.parse(this.props.patch))
    return (
      <div>
        {innerTree}
        <button onClick={this.handleInsert}>Insert</button>
        <button onClick={this.handleRemove}>Remove</button>
      </div>
    )
  }
}

export default Main

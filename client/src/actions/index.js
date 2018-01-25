import * as utils from '../utils/'

export const removeLine = mutation => dispatch => {
  // dispatch({ type: 'ADD_DELETE_HINT', mutation})
  dispatch({ type: 'DELETE_LINE', mutation})
}



  
  // 目的是修改 file
  
  // const { textLines } = this.state
  // const { lineNum } = mutation
  // const lineIndex = lineNum - 1
  // return new Promise(resolve => {
  //   this.setState({
  //     textLines: utils.addHintToDeletedLine(textLines, lineIndex)
  //   }, () => {
  //     const delay = 2000
  //     setTimeout(
  //       () => this.setState({
  //         textLines: utils.removeElementAtIndex(textLines, lineIndex)
  //       }, resolve), delay
  //     )
  //   })
  // })

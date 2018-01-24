import { 
  HUNK_META,
  DELETED_LINE,
  ADDED_LINE
} from '../constants/RegExp'

export function eachPromise(str, iterator, index) {
  const promiseReducer = (prev, current) =>
    prev.then(() => iterator(current, index))
    
  return Array.from(str).reduce(promiseReducer, Promise.resolve());
}


export const insertEmptyLineAtIndex = (arr, index) => {
  return [
    ...arr.slice(0, index),
    '',
    ...arr.slice(index)
  ]
}

export const insertCharacterAtIndex = (arr, char, index) => {
  return arr.map(
    (t, i) => {
      if (i === index) {
        return t + char
      }
      return t
    }
  )
}

export const removeElementAtIndex = (arr, index) => {
  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ]
}

export const addHintToDeletedLine = (textlines, index) => {
  return textlines.map(
    (t, i) => {
      if (i === index) {
        return t + 'DELETE'
      }
      return t
    }
  )
}


export const parsePatch = patch => {
  console.log('this is patch', patch)
  let result = []
  let hunkLines = patch.split('\n')
  let metaMatches = hunkLines[0].match(HUNK_META)
  let startLineNum = Number(metaMatches[1])
  console.log('startLineNum', startLineNum)
  // 拿到这个 patch hunk 的第一行在源文件中的行号

  const patchLines = hunkLines.slice(1)
  console.log('patchLines', patchLines)
  let offSet = 0 // startNum + offSet 等于最终的 lineNum
  for (let i = 0; i < patchLines.length; i++) {
    let line = patchLines[i]
    console.log('line====', line, i)
    if (DELETED_LINE.test(line)) {
      result.push({
        type: "deleted",
        text: line.substr(1),
        lineNum: startLineNum + offSet
      })
      continue
    }

    if (ADDED_LINE.test(line)) {
      result.push({
        type: "added",
        text: line.substr(1),
        lineNum: startLineNum + offSet
      })
      offSet += 1
      continue
    }
    offSet += 1
  }
  return result
  // return [
  //   {
  //     lineNo: '3',
  //     type: 'delete',
  //         text: `consolg.log('hello')`
  //       },
  //       {
  //         lineNo: '3',
  //         type: 'add',
  //         text: 'xxx'
  //       }
  //     ]
}

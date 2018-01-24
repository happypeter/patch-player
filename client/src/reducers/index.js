const initialState = {
  patch: `@@ -2,7 +2,7 @@ import React, { Component } from 'react'
 import styled from 'styled-components'
 import Typist from '../typist/Typist'
 import io from 'socket.io-client'
-import Prism from 'prismjs'
+import Prsm from 'prismjs'
 import 'prismjs/components/prism-javascript'
 import 'prismjs/components/prism-markup'
 import 'prismjs/components/prism-jsx'
@@ -22,12 +22,11 @@ class App extends Component {
 
   componentDidMount = () => {
     const socket = io(SERVER_URL);
-    socket.on('file content and patch', data => {
       const {files, commit} = this.state
+      hello peter
       if (commit === data.commit) {
         const exist = files.find(file => file.name === data.file.name)
         if (!exist) {
  `
}
const rootReducer = (state = initialState, action) => {
  return state
}

export default rootReducer

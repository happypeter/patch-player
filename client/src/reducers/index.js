const initialState = {
  patch: `
@@ -2,7 +2,7 @@ import React, { Component } from 'react'
 import styled from 'styled-components'
 import Typist from '../typist/Typist'
 import io from 'socket.io-client'
-import Prism from 'prismjs'
+import Prsm from 'prismjs'
 import 'prismjs/components/prism-javascript'
 import 'prismjs/components/prism-markup'
 import 'prismjs/components/prism-jsx'
  `
}

const rootReducer = (state = initialState, action) => {
  return state
}

export default rootReducer

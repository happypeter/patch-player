import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import socket from '../utils/socket'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { createSyncMiddleware } from '../utils/sync-middleware'
let middleware = applyMiddleware(thunk, logger)
if (sessionStorage.getItem('mode') === 'master') {
  middleware = applyMiddleware(createSyncMiddleware(socket), thunk, logger)
}

export default createStore(rootReducer, middleware)

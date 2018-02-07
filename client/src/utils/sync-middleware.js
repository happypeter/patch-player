export const createSyncMiddleware = socket => {
  return () => next => action => {
    if (typeof action === 'object') {
      // FIXME: 这里的 action 首次收到的是一个 function ，大概是 thunk 造成的
      socket.emit('action', action)
    }
    next(action)
  }
}

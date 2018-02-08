export const createSyncMiddleware = socket => {
  return () => next => action => {
    if (typeof action === 'object') {
      socket.emit('action', action)
    }
    next(action)
  }
}

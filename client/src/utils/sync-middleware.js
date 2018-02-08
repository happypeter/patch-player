export const createSyncMiddleware = socket => {
  return () => next => action => {
    socket.emit('action', action)
    next(action)
  }
}

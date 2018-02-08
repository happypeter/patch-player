export const createSyncMiddleware = socket => {
  return () => next => action => {
    console.log('action-----', action)
    socket.emit('action', action)
    next(action)
  }
}

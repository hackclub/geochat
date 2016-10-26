export default function createSocketIoMiddleware(socket, prefix, eventName='action') {
  return ({ dispatch }) => {
    // Dispatch actions sent by the server
    socket.on(eventName, dispatch)

    return next => action => {
      if (action.type.startsWith(prefix)) {
        socket.emit(eventName, action)
      }
      next(action)
    }
  }
}

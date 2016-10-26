import { createServer } from 'http'
import IO from 'socket.io'
import config from './config'

const server = createServer()
const io = IO(server)

let state = {
  users: {}
}

io.on('connection', client => {
  console.log('Client connected!')

  state.users[client.id] = {
    ip: client.request.connection.remoteAddress
  }

  client.emit('action', {
    type: 'RECEIVE_CURRENT_USER',
    user: {
      ...state.users[client.id],
      id: client.id
    }
  })

  client.on('action', action => {
    switch(action.type) {
    case 'server/SEND_MESSAGE':
      let msg = action.message

      io.sockets.emit('action', {
        type: 'RECEIVE_MESSAGE',
        message: {
          userId: client.id,
          body: msg
        }
      })
    }
  })

  client.on('disconnect', () => {
    console.log('Client disconnected!')
  })
})

server.listen(config.port, config.host)
console.log(`Ready on http://${config.host}:${config.port}`)

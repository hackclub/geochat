import { createServer } from 'http'
import IO from 'socket.io'
import fetch from 'node-fetch'
import config from './config'

const server = createServer()
const io = IO(server)

let state = {
  users: {}
}

io.on('connection', client => {
  console.log('Client connected!')

  let client_ip = client.request.headers['x-forwarded-for'] || client.request.connection.remoteAddress

  new Promise((resolve, reject) => {
    for (let userId in state.users) {
      let user = state.users[userId]

      client.emit('action', {
        type: 'USER_JOINED',
        user: {
          ...user,
          id: userId
        }
      })
    }

    return resolve()
  })
    .then(() => fetch(`https://ifcfg.me/${client_ip}/json`))
    .then(res => res.json())
    .then(body => ({
      city: body.city,
      country: body.country,
      latitude: body.latitude,
      longitude: body.longitude
    }))
    .then(ip_info => {
      state.users[client.id] = {
        ...ip_info,
        ip: client_ip
      }

      const user = {
        ...state.users[client.id],
        id: client.id
      }

      client.emit('action', {
        type: 'RECEIVE_CURRENT_USER',
        user
      })

      client.broadcast.emit('action', {
        type: 'USER_JOINED',
        user
      })
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

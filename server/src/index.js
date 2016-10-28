import { createServer } from 'http'
import IO from 'socket.io'
import fetch from 'node-fetch'
import config from './config'

const server = createServer()
const io = IO(server)

let state = {
  users: {},
  messages: []
}

io.set('origins', 'https://geochat.hackclub.com:443')

io.set('heartbeat interval', 500)
io.set('heartbeat timeout', 1000)

io.on('connection', client => {
  console.log('Client connected!')

  const client_ip = client.request.headers['x-forwarded-for'] || client.request.connection.remoteAddress
  let stateSync

  fetch(`https://ifcfg.me/${client_ip}/json`)
    .then(res => res.json())
    .then(body => ({
      city: body.city || 'Unknown City',
      country: body.country || 'Unknown Country',
      latitude: body.latitude || 0,
      longitude: body.longitude || 0
    }))
    .then(ip_info => {
      state.users[client.id] = {
        ...ip_info,
        ip: client_ip
      }

      let sendInitialState = function() {
        client.emit('action', {
          type: 'INITIAL_STATE',
          state: {
            users: {
              currentUserId: client.id,
              all: state.users
            },
            messages: state.messages
          }
        })
      }

      sendInitialState()
      stateSync = setInterval(() => {
        sendInitialState()
      }, 1000)

      client.broadcast.emit('action', {
        type: 'USER_JOINED',
        user: {
          ...state.users[client.id],
          id: client.id
        }
      })
    })

  client.on('action', action => {
    switch(action.type) {
    case 'server/SEND_MESSAGE':
      const msg = action.message
      const userCity = state.users[client.id].city

      state.messages.push({
        userId: client.id,
        city: userCity,
        body: msg
      })

      io.sockets.emit('action', {
        type: 'RECEIVE_MESSAGE',
        message: {
          userId: client.id,
          city: userCity,
          body: msg
        }
      })
    }
  })

  client.once('disconnect', () => {
    if (stateSync) {
      clearInterval(stateSync)
    }
    delete state.users[client.id]

    io.sockets.emit('action', {
      type: 'USER_LEFT',
      userId: client.id
    })
    console.log('Client disconnected!')
  })
})

server.listen(config.port, config.host)
console.log(`Ready on http://${config.host}:${config.port}`)

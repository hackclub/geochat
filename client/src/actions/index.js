export const SEND_MESSAGE = 'server/SEND_MESSAGE'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
})

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
})

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const USER_JOINED = 'USER_JOINED'
export const USER_LEFT = 'USER_LEFT'

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

export const userJoined = user => ({
  type: USER_JOINED,
  user
})

export const userLeft = userId => ({
  type: USER_JOINED,
  userId
})

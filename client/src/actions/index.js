export const INITIAL_STATE = 'INITIAL_STATE'

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

export const USER_JOINED = 'USER_JOINED'
export const USER_LEFT = 'USER_LEFT'

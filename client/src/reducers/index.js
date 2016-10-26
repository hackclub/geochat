import { combineReducers } from 'redux'
import {
  RECEIVE_CURRENT_USER,

  USER_JOINED, USER_LEFT,

  SEND_MESSAGE, RECEIVE_MESSAGE
} from '../actions'

const currentUser = (state = {}, action) => {
  switch(action.type) {
  case RECEIVE_CURRENT_USER:
    return action.user
  default:
    return state
  }
}

const users = (state = [], action) => {
  switch(action.type) {
  case USER_JOINED:
    return [
      action.user,
      ...state
    ]
  case USER_LEFT:
    return state.filter(user => user.id !== action.userId)
  default:
    return state
  }
}

const messages = (state = [], action) => {
  switch(action.type) {
  case SEND_MESSAGE:
    return state
  case RECEIVE_MESSAGE:
    return [
      ...state,
      action.message
    ]
  default:
    return state
  }
}

const rootReducer = combineReducers({
  currentUser,
  users,
  messages
})

export default rootReducer

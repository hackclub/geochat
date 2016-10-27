import { combineReducers } from 'redux'
import {
  INITIAL_STATE,

  USER_JOINED, USER_LEFT,

  SEND_MESSAGE, RECEIVE_MESSAGE
} from '../actions'

const users = (state = {
  currentUserId: null,
  all: {}
}, action) => {
  switch(action.type) {
  case INITIAL_STATE:
    return action.state.users
  case USER_JOINED:
    let stateWithNewUser = { ...state }
    let { id: joinedId, ...joinedUser } = action.user

    stateWithNewUser.all[joinedId] = joinedUser

    return stateWithNewUser
  case USER_LEFT:
    let newState = { ...state }
    delete newState.all[action.userId]

    return newState
  default:
    return state
  }
}

const messages = (state = [], action) => {
  switch(action.type) {
  case INITIAL_STATE:
    return action.state.messages
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
  users,
  messages
})

export default rootReducer

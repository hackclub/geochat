import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSocketIoMiddleware from './middleware/socketIo'
import IO from 'socket.io-client'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'

let socket = IO("http://localhost:4000")
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(socketIoMiddleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

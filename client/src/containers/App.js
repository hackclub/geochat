import React, { Component } from 'react'
import Radium from 'radium'
import Map from './Map'
import Chat from './Chat'

const styles = {
  map: {
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  chat: {
    position: 'absolute',
    right: '50px',
    bottom: '50px',
    width: '400px',
    zIndex: 1
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Chat style={styles.chat} />
        <Map
            apiKey={'AIzaSyCb0SKkQRH8dHxK8qu7c-w0DUGgf7CPZqY'}
            style={styles.map} />
      </div>
    )
  }
}

export default Radium(App)

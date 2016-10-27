import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import colors from '../colors'
import pin from './map_pin.png'

const K_WIDTH = 22
const K_HEIGHT = 40

const styles = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  bottom: -K_HEIGHT / 2,
}

class UserMarker extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user, style } = this.props

    return (
      <img src={pin} style={[styles,style]} />
    )
  }
}

export default Radium(UserMarker)

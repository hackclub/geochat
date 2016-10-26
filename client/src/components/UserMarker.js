import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import colors from '../colors'
import pin from './map_pin.png'

const K_WIDTH = 22
const K_HEIGHT = 40

const styles = {
  base: {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
  },
  hover: {
    width: K_WIDTH * 1.5,
    height: K_HEIGHT * 1.5,
    left: -K_WIDTH / 1.5,
    top: -K_HEIGHT,
  }
}

class UserMarker extends Component {
  static propTypes = {
    $hover: PropTypes.bool,
    user: PropTypes.object.isRequired
  }

  render() {
    const { user, $hover } = this.props

    return (
      <img src={pin} style={[
        styles.base,
        $hover ? styles.hover : null
      ]} />
    )
  }
}

export default Radium(UserMarker)

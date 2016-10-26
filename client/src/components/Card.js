import React, { Component } from 'react'
import Radium from 'radium'
import colors from '../colors'

const styles = {
  backgroundColor: colors.bg,
  maxWidth: '350px',
  paddingTop: '17.5px',
  paddingRight: '17.5px',
  paddingBottom: '17.5px',
  paddingLeft: '17.5px',
  border: `1px solid ${colors.outline}`,
  boxShadow: `0px 1px 50px -15px ${colors.gray}`,
  borderRadius: '5px'
}

class Card extends Component {
  render() {
    return (
        <div style={[styles,this.props.style]}>
        {this.props.children}
      </div>
    )
  }
}

export default Radium(Card)

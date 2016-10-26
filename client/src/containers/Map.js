import React, { Component } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import GoogleMap from 'google-map-react'
import UserMarker from '../components/UserMarker'

const mapStyles = [
  {
    'featureType': 'administrative',
    'elementType': 'all',
    'stylers': [
      { 'hue': '#000000' },
      { 'lightness': 15 },
      { 'visibility': 'on' }
    ]
  },
  {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [
      { 'hue': '#dddddd' },
      { 'saturation': -100 },
      { 'lightness': -3 },
      { 'visibility': 'on' },
    ]
  },
  {
    'featureType': 'landscape',
    'elementType': 'labels',
    'stylers': [
      { 'hue': '#000000' },
      { 'saturation': -100 },
      { 'lightness': -100 },
      { 'visibility': 'off' }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      { 'hue': '#000000' },
      { 'saturation': -100 },
      { 'lightness': -100 },
      { 'visibility': 'off' }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      { 'hue': '#bbbbbb' },
      { 'saturation': -100 },
      { 'lightness': 26 },
      { 'visibility': 'on' }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels',
    'stylers': [
      { 'hue': '#ffffff' },
      { 'saturation': -100 },
      { 'lightness': 100 },
      { 'visibility': 'off' }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'all',
    'stylers': [
      { 'hue': '#ffffff' },
      { 'saturation': -100 },
      { 'lightness': 100 },
      { 'visibility': 'on' }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels',
    'stylers': [
      { 'hue': '#000000' },
      { 'lightness': -100 },
      { 'visibility': 'off' }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      { 'hue': '#ffffff' },
      { 'saturation': -100 },
      { 'lightness': 100 },
      { 'visibility': 'on' }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels',
    'stylers': [
      { 'hue': '#000000' },
      { 'saturation': -100 },
      { 'lightness': -100 },
      { 'visibility': 'off' }
    ]
  }
]

class Map extends Component {
  static defaultProps = {
    zoom: 4
  }

  render() {
    const { apiKey, currentUserId, users, zoom, style } = this.props

    const currentUser = users[currentUserId]

    let center = null

    if (currentUser) {
      center = {
        lat: parseFloat(currentUser.latitude),
        lng: parseFloat(currentUser.longitude) + 5
      }
    }

    let userMarkers = Object.keys(users).map(key => {
      let user = users[key]

      const coords = {
        lat: parseFloat(user.latitude),
        lng: parseFloat(user.longitude)
      }

      return (
        <UserMarker key={key} user={user} {...coords} />
      )
    })

    return (
      <GoogleMap
          bootstrapURLKeys={{key: apiKey}}
          center={center}
          zoom={zoom}
          options={{styles: mapStyles}}
          style={style}>
        {userMarkers}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  currentUserId: state.users.currentUserId,
  users: state.users.all
})

export default connect(
  mapStateToProps
)(Radium(Map))

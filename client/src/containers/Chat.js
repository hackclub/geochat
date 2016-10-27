import React, { Component } from 'react'
import Radium from 'radium'
import Card from '../components/Card'
import colors from '../colors'
import { connect } from 'react-redux'
import { sendMessage } from '../actions'

const styles = {
  card: {
    paddingTop: '12.5px',
    paddingBottom: '12.5px'
  },
  messages: {
    maxHeight: '400px',
    overflowY: 'scroll'
  },
  form: {
    marginTop: '5px',
    input: {
      fontFamily: 'inherit',
      fontSize: '15px',
      color: colors.userInput,
      width: '100%',
      boxSizing: 'border-box',
      display: 'block',
      paddingTop: '7px',
      paddingLeft: '6px',
      paddingRight: '6px',
      paddingBottom: '6px',
      borderRadius: '3px',
      border: `1px solid ${colors.outline}`
    }
  },
  userCount: {
    fontSize: '14px',
    fontStyle: 'italic',
    marginTop: '7.5px',
  }
}

class Chat extends Component {
  _scrollToLatestMessage() {
    const { messages } = this.props

    const latestMessageNode = this['_div' + (messages.length-1)]
    if (latestMessageNode) {
      latestMessageNode.scrollIntoView()
    }
  }

  componentDidMount() {
    this._scrollToLatestMessage()
  }

  componentDidUpdate() {
    this._scrollToLatestMessage()
  }

  render() {
    const { users, messages, sendMessage, style } = this.props

    let input

    const userCount = Object.keys(users).length

    const renderedMessages = messages.map((msg, index) => {
      return (
        <div
            key={index}
            ref={ref => this['_div' + index] = ref}>
          <p>{msg.city} – {msg.body}</p>
        </div>
      )
    })

    return (
      <Card style={[styles.card, style]}>
        <div style={styles.messages}>
          {renderedMessages}
        </div>
        <form style={styles.form} onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            sendMessage(input.value)
            input.value = ''
          }}>
          <input
              style={styles.form.input}
              placeholder="Type a message and hit enter to send..."
              ref={node => {
                  input = node
                }} />
        </form>
        <div style={[styles.userCount]}>
          {userCount} {userCount == 1 ?
                       "user is" :
                       "users are"
                      } currently online
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.all,
  messages: state.messages
})

export default connect(
  mapStateToProps,
  { sendMessage }
)(Radium(Chat))

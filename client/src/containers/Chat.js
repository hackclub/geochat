import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../actions'

class Chat extends Component {
  render() {
    const { users, messages, sendMessage } = this.props

    let input
    let renderedMessages = messages.map((msg, index) => {
      const user = users.all[msg.userId]

      return (
        <div key={index}>
          <p>{user.city} - {msg.body}</p>
        </div>
      )
    })

    return (
      <div>
        <div>
          {renderedMessages}
        </div>
        <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            sendMessage(input.value)
            input.value = ''
          }}>
          <input ref={node => {
              input = node
            }} />
          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  messages: state.messages
})

export default connect(
  mapStateToProps,
  { sendMessage }
)(Chat)

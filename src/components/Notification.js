import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message === 'Wrong username or password' ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification
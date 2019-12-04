import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message === ('Wrong username or password') || message === ('Error: Please fill all input fields') ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification
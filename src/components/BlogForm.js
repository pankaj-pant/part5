import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, title, author, url, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      title:<input
        value={title}
        onChange={handleTitleChange}
      /> <br />
      author:<input
        value={author}
        onChange={handleAuthorChange}
      /> <br />
      url:<input
        value={url}
        onChange={handleUrlChange}
      /> <br />
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm
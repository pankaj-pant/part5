import React from 'react'


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

export default BlogForm
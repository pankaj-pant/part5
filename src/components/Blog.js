import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  const updateLikes = (event) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService
      .update(blog.id, blogObject)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {show ?
        <div>
          <div onClick={toggleShow}>
            {blog.title} {blog.author}
          </div>
          <a href={blog.url}>{blog.url}</a> <br/>
          {blog.likes} likes <button onClick={updateLikes}>like</button><br/>
          {`added by ${blog.user.name}`}<br />
          <button onClick={() => window.confirm(`remove blog ${blog.title} by ${blog.author}`)}>remove</button>
        </div>
        :
        <div onClick={toggleShow}>
          {blog.title} {blog.author}
        </div>
      }
    </div>
  )
}

export default Blog

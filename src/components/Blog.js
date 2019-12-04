import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedUser }) => {
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

  const handleDelete = (event) => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)

    if(result === true){
      blogService
        .deleteBlog(blog.id)
    }
  }

  const deleteButton = () => {
    if (loggedUser.name === blog.user.name){
      return <button onClick={handleDelete}>remove</button>
    }
  }

  return (
    <div style={blogStyle} className="view">
      {show ?
        <div className="shown">
          <div onClick={toggleShow}>
            {blog.title} {blog.author}
          </div>
          <a href={blog.url}>{blog.url}</a> <br/>
          {blog.likes} likes <button onClick={updateLikes}>like</button><br/>
          {`added by ${blog.user.name}`}<br />
          {deleteButton()}
        </div>
        :
        <div onClick={toggleShow} className="hidden">
          {blog.title} {blog.author}
        </div>
      }
    </div>
  )
}

export default Blog

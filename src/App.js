import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
    setNotification(
      `A new blog ${title} by ${author} added`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div className="App">
      {user === null ?
        <div>
          <h2>Blogs Application</h2>
          <Notification message={errorMessage}/>
          <h2>Login</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h2>Blogs Application</h2>
          <Notification message={notification}/>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>Create new blog</h2>
          {blogForm()}
          <h2>List of blogs in database</h2>
          <ul>
            {blogs.map(b =>
              <Blog
                key={b.id}
                blog={b}
              />
            )}
          </ul>
        </div>
      }





    </div>
  )
}

export default App

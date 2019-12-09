import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
import useField from './hooks/index'


const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [blogs])

  const compare = (a, b) => {
    const blogA = a.likes
    const blogB = b.likes

    let comparison = 0
    if (blogA > blogB) {
      comparison = 1
    } else if (blogA < blogB) {
      comparison = -1
    }
    return comparison * -1
  }

  blogs.sort(compare)


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
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      username.reset()
      password.reset()
      //setUsername('')
      //setPassword('')
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
    username.reset()
    password.reset()
    //setUsername('')
    //setPassword('')
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          handleSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          //handleAuthorChange={({ target }) => setAuthor(target.value)}
          //handleTitleChange={({ target }) => setTitle(target.value)}
          //handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      blogFormRef.current.toggleVisibility()
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      title.reset()
      author.reset()
      url.reset()
      //setTitle('')
      //setAuthor('')
      //setUrl('')
      setNotification(
        `A new blog ${title.value} by ${author.value} added`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error: Please fill all input fields')
      title.reset()
      author.reset()
      url.reset()
      //setTitle('')
      //setAuthor('')
      //setUrl('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }


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
          <Notification message={errorMessage}/>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>Create new blog</h2>
          {blogForm()}
          <h2>List of blogs in database</h2>
          <ul>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                loggedUser={user}
              />
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App

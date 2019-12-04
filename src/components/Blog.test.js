import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('only the name and author of the blog post are shown by default', () => {
  const testBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'ppant',
    likes: 5,
    user: {
      name: 'Pankaj Pant'
    }
  }

  const testUser = {
    name: 'Pankaj Pant'
  }

  const component = render(
    <Blog blog={testBlog} loggedUser={testUser}/>
  )

  //component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library ppant'
  )

})

test('when the blog post is clicked, the other information of the blog post becomes visible', () => {
  const testBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'ppant',
    likes: 5,
    user: {
      name: 'Pankaj Pant'
    }
  }

  const testUser = {
    name: 'Pankaj Pant'
  }

  const component = render(
    <Blog blog={testBlog} loggedUser={testUser}/>
  )

  const div = component.container.querySelector('.hidden')
  const div2 = component.container.querySelector('.view')
  fireEvent.click(div)

  expect(div2).toHaveTextContent(
    'Component testing is done with react-testing-library ppant 5 likes'
  )

})

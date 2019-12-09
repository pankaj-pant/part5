import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders title, author and likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'ppant',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library ppantblog has 5 likes'
  )

  const div = component.container.querySelector('.titleAuthor')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const div2 = component.container.querySelector('.likes')
  expect(div2).toHaveTextContent(
    'blog has 5 likes'
  )
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'ppant',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'ppant',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
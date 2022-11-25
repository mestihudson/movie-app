import { render, screen, waitFor } from '@testing-library/react'

import MovieListPage from './MovieListPage'

describe('components/MovieListPage', () => {
  it('should call retrieve movies service when page has loaded', () => {
    const retrieveMoviesServiceMock = jest.fn()

    render(<MovieListPage retrieveMoviesService={retrieveMoviesServiceMock}/>)

    expect(retrieveMoviesServiceMock).toHaveBeenCalled()
  })

  it('should populate collection when retrieve movies service ends on successful',
    async () => {
    const retrieveMoviesServiceMock = jest.fn().mockImplementation(() => Promise.resolve([1]))

    render(<MovieListPage retrieveMoviesService={retrieveMoviesServiceMock}/>)

    await waitFor(() => {
      expect(screen.queryAllByTestId('movie').length).toBe(1)
    })
  })
})

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import MovieListPage from './MovieListPage'

const renderMovieListPage = ({
    retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve([1])),
    updateBaseServiceMock = jest.fn()
  } = {}) => {
  render(
    <MovieListPage
      retrieveMoviesService={retrieveMoviesServiceMock}
      updateBaseService={updateBaseServiceMock}
    />
  )
}

describe('components/MovieListPage', () => {
  it('should call retrieve movies service when page has loaded', async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve([1]))

    renderMovieListPage({ retrieveMoviesServiceMock })

    await waitFor(() => expect(retrieveMoviesServiceMock).toHaveBeenCalled())
  })

  it('should populate collection when retrieve movies service ends on successful',
    async () => {
    renderMovieListPage()

    await waitFor(() => expect(screen.queryAllByTestId('movie').length).toBe(1))
  })

  it('should call update base service when update button has clicked', async () => {
    const updateBaseServiceMock = jest.fn()

    renderMovieListPage({ updateBaseServiceMock })
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() => expect(updateBaseServiceMock).toHaveBeenCalled())
  })
})

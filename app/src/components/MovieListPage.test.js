import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import MovieListPage from './MovieListPage'

const renderMovieListPage = ({
    retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve([1])),
    updateBaseServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve())
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

    await waitFor(() => expect(retrieveMoviesServiceMock).toHaveBeenCalledTimes(1))
  })

  it('should show list of movies when collection is not empty', async () => {
    renderMovieListPage()

    await waitFor(() => expect(screen.queryAllByTestId('movie')).toHaveLength(1))
  })

  it('should call update base service when update button has clicked',
    async () => {
    const updateBaseServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve())

    renderMovieListPage({ updateBaseServiceMock })
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() => expect(updateBaseServiceMock).toHaveBeenCalledTimes(1))
  })

  it('should call retrieve movies service when update base service ends on successful',
    async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve([1]))

    renderMovieListPage({ retrieveMoviesServiceMock })
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() => expect(retrieveMoviesServiceMock).toHaveBeenCalledTimes(2))
  })

  it('should not show list of movies when collection is empty', async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve([]))

    renderMovieListPage({ retrieveMoviesServiceMock })

    await waitFor(() => expect(screen.queryAllByTestId('movie')).toHaveLength(0))
  })
})

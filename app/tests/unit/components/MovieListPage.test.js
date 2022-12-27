import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import MovieListPage from '../../../src/components/MovieListPage'

const retrieveMoviesServiceData = {
  movies: [{
    id: 1, title: 'Spider-man: Homecoming',
    description: 'Spider-man description', director: 'Jon Watts',
    producer: 'Kevin Feige',
    banner: 'banner.jpg',
    poster: 'poster.jpg',
    originalId: 'abcd1234',
  }],
  total: 1
}
const retrieveMoviesServiceEmptyData = {
  movies: [],
  total: 0
}
const updateBaseServiceData = {
  modified: false
}
const renderMovieListPage = ({
    retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve(retrieveMoviesServiceData)),
    updateBaseServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve(updateBaseServiceData))
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
      .mockImplementation(() => Promise.resolve(retrieveMoviesServiceData))

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
      .mockImplementation(() => Promise.resolve(updateBaseServiceData))

    renderMovieListPage({ updateBaseServiceMock })
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() => expect(updateBaseServiceMock).toHaveBeenCalledTimes(1))
  })

  it('should call retrieve movies service when update base service ends on successful',
    async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve(retrieveMoviesServiceData))

    renderMovieListPage({ retrieveMoviesServiceMock })
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() => expect(retrieveMoviesServiceMock).toHaveBeenCalledTimes(2))
  })

  it('should not show list of movies when collection is empty', async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve(retrieveMoviesServiceEmptyData))

    renderMovieListPage({ retrieveMoviesServiceMock })

    await waitFor(() => expect(screen.queryAllByTestId('movie')).toHaveLength(0))
  })

  it('should show empty message when collection is empty', async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.resolve(retrieveMoviesServiceEmptyData))

    renderMovieListPage({ retrieveMoviesServiceMock })

    await waitFor(() =>
      expect(screen.queryAllByTestId('empty-movie-list-message'))
        .toHaveLength(1)
    )
  })

  it('should not show empty message when collection is not empty', async () => {
    renderMovieListPage()

    await waitFor(() =>
      expect(screen.queryAllByTestId('empty-movie-list-message'))
        .toHaveLength(0)
    )
  })

  it('should show error alert message when retrieve movies service ends on fail',
    async () => {
    const retrieveMoviesServiceMock = jest.fn()
      .mockImplementation(() => Promise.reject())

    renderMovieListPage({ retrieveMoviesServiceMock })

    await waitFor(() =>
      expect(screen.queryAllByTestId('error-alert-message'))
        .toHaveLength(1)
    )
  })

  it('should show error alert message when update base service ends on fail',
    async () => {
    const updateBaseServiceMock = jest.fn().mockRejectedValue({})

    renderMovieListPage({ updateBaseServiceMock })
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() =>
      expect(screen.queryAllByTestId('error-alert-message'))
        .toHaveLength(1)
    )
  })

  it('should show success alert message when update base service ends on successful',
    async () => {
    renderMovieListPage()
    fireEvent.click(screen.getByTestId('update-movie-base'))

    await waitFor(() =>
      expect(screen.queryAllByTestId('success-alert-message'))
        .toHaveLength(1)
    )
  })
})

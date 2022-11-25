import { render } from '@testing-library/react'

import MovieListPage from './MovieListPage'

describe('components/MovieListPage', () => {
  it('should call retrieve movies service when page has loaded', () => {
    const retrieveMoviesServiceMock = jest.fn()

    render(<MovieListPage retrieveMoviesService={retrieveMoviesServiceMock}/>)

    expect(retrieveMoviesServiceMock).toHaveBeenCalled()
  })
})

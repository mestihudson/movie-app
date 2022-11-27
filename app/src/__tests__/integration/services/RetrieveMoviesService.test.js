import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'

import MovieListPage from '../../../components/MovieListPage'
import { retrieveMoviesService } from '../../../services/RetrieveMoviesService'
import { server } from '../mocks/server'

it('should retrieve movies from api', async () => {
  server.use(
    rest.get('/api/movies', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([1,2])
      )
    })
  )
  await waitFor(() =>
    render(
      <MovieListPage
        retrieveMoviesService={retrieveMoviesService}
      />
    )
  )

  await waitFor(() => expect(screen.queryAllByTestId('movie')).toHaveLength(2))
})

it('should handler error from api', async () => {
  server.use(
    rest.get('/api/movies', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({})
      )
    })
  )
  await waitFor(() =>
    render(
      <MovieListPage
        retrieveMoviesService={retrieveMoviesService}
      />
    )
  )

  await waitFor(() =>
    expect(screen.queryAllByTestId('error-alert-message')).toHaveLength(1)
  )
})

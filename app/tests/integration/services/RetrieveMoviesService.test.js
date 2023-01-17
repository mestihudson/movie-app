import { retrieveMoviesService } from '@/services/RetrieveMoviesService'
import { rest, server } from '#/integration/mocks/server'

it('should handler successful api response', async () => {
  server.use(
    rest.get('/api/movies', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([1,2])
      )
    })
  )

  await expect(retrieveMoviesService()).resolves.toStrictEqual([1,2])
})

it('should handler error api response', async () => {
  server.use(
    rest.get('/api/movies', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({})
      )
    })
  )

  await expect(retrieveMoviesService()).rejects.toThrow()
})

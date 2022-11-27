import { updateBaseService } from '../../../services/UpdateBaseService'
import { rest, server } from '../mocks/server'

it('should handler successful api response', async () => {
  server.use(
    rest.get('/api/update', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({})
      )
    })
  )

  await expect(updateBaseService()).resolves.toStrictEqual({})
})

const { rest } = require('msw')
const { setupServer } = require('msw/node')

const server = setupServer()

const mockTheMovieDbCall = (total_pages = 1) => {
  server.use(
    rest.get('https://api.themoviedb.org/4/list/:list_id', (req, res, ctx) => {
      const query = Object.fromEntries(req.url.searchParams.entries())
      const page = query.page || 1
      const id = page
      return res(
        ctx.json({
          total_pages,
          results: [{
            id,
            media_type: 'movie',
            backdrop_path: `[backdrop_path]-${page}`,
            poster_path: `[poster_path]-${page}`,
            title: `[title]-${page}`,
            overview: `[overview]-${page}`,
          }]
        })
      )
    }),
    rest.get(`https://api.themoviedb.org/3/movie/:id/credits`, (req, res, ctx) => {
      const { id } = req.params
      return res(
        ctx.json({
          id,
          crew: [{
              "name": `Anthony Russo-${id}`,
              "job": "Director",
            },{
              "name": `Joe Russo-${id}`,
              "job": "Director",
            },{
              "name": `Kevin Feige-${id}`,
              "job": "Producer"
          }]
        })
      )
    })
  )
}

module.exports = { mockTheMovieDbCall, rest, server }

const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const movieRouter = require('./routers/movie')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const specs = swaggerJsDoc({
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie-App API',
      description: 'Serviços disponibilizados pela api da aplicação movie-app',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${process.env.REMOTE_APP_ADDRESS || 'localhost'}:14000/api`,
        description: "Development server",
      },
      {
        url: `${process.env.API_BASE_URL}/api`,
        description: "Production server",
        production: true
      },
    ].filter((server) => process.env.NODE_ENV !== 'production' || server.production),
    components: {
      schemas: {
        ...require('./schemas-swagger.json')
      },
    },
  },
  apis: ['**/routers/**/*.js'],
})

console.log(specs)

app.use(
  '/docs/',
  async (req, res, next) => {
    req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url
    next()
  },
  swaggerUi.serve,
  swaggerUi.setup(specs)
)
app.use('/', movieRouter)

module.exports = app

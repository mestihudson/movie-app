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
    components: {
      schemas: {
        "RetrieveMoviesResponse": {
          "type": "object",
          "properties": {
            "movies": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Movie"
              }
            },
            "total": {
              "type": "number"
            }
          }
        },
        "Movie": {
          "type": "object",
          "properties": {
            "id": { "type": "number" },
            "title": { "type": "string" },
            "description": { "type": "string" },
            "director": { "type": "string" },
            "producer": { "type": "string" },
            "banner": { "type": "string" },
            "poster": { "type": "string" },
            "originalId": { "type": "string" }
          }
        },
        "UpdateBaseResponse": {
          "type": "object",
          "properties": {
            "modified": { "type": "boolean" }
          }
        }
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

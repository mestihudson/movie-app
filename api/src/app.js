const express = require('express')

const movieRouter = require('./routers/movie')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', movieRouter)

module.exports = app

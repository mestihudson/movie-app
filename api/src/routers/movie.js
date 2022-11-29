const express = require('express')

const router = express.Router()

const useCase = require('../usecases/retrieve-movies')

router.get('/movies', (req, res) => {
  useCase()
    .then((movies) => {
      res.json(movies)
    })
})

module.exports = router

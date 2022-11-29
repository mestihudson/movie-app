const express = require('express')

const router = express.Router()

router.get('/movies', require('../controllers/retrieve-movies'))

module.exports = router

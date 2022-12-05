const express = require('express')

const router = express.Router()

router.get('/movies', require('../controllers/retrieve-movies'))
router.get('/update', require('../controllers/update-base'))

module.exports = router

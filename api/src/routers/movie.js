const express = require('express')

const router = express.Router()

/**
 * @openapi
 * /movies:
 *   get:
 *     description: Retrieve a page of all movies stored in local database
 *     parameters:
 *     - name: page
 *       in: query
 *       required: false
 *       type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RetrieveMoviesResponse'
 */
router.get('/movies', require('../controllers/retrieve-movies'))

/**
 * @openapi
 * /update:
 *   get:
 *     description: Retrieve all movies from remote api and update database
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateBaseResponse'
 */
router.get('/update', require('../controllers/update-base'))

module.exports = router

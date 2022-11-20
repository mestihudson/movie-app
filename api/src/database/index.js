const environment = process.env.NODE_ENV || 'development'
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile[environment])

module.exports = knex

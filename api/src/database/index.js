const knex = require('knex')(knexfile[process.env.NODE_ENV])
const knexfile = require('../knexfile')

module.exports = knex

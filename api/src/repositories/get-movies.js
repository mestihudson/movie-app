const { knex } = require('../database')

module.exports = () => {
  return knex
    .select('*')
    .from('movie')
}

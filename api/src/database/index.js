const environment = process.env.NODE_ENV || 'development'

const knexfile = require('../knexfile')[environment]

const knex = require('knex')(knexfile)

const migrate = () => {
  return knex.migrate.latest()
    .then(() => {
      return knex.seed.run()
        .then(() => console.log('Seed runned'))
        .catch((error) => console.error('Seed not runned ', error))
    })
    .catch((error) => console.error('Migration not runned ', error))
}

module.exports = { knex, migrate }

const environment = process.env.NODE_ENV || 'development'

const knexfile = require('../knexfile')

const knex = require('knex')(knexfile[environment])

const migrate = () => {
  knex.migrate.latest()
    .then(() => {
      if (environment === 'development') {
        knex.seed.run()
          .then(() => {
            console.log('Seed runned')
          })
          .catch((error) => {
            console.error('Seed not runned ', error)
          })
      }
    })
    .catch((error) => {
      console.error('Migration not runned ', error)
    })
}

module.exports = { knex, migrate }

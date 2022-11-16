const environment = process.env.NODE_ENV || 'development'
const express = require('express')
const app = express()
const knex = require('./database')
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

app.get("/", (req, res) => {
  return res.json({ message: 'success' })
})

app.listen(process.env.PORT, () => {
  console.log('Server started and listening to port 3000')
})

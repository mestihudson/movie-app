require('dotenv').config({ path: '/opt/projects/movie/api/.env' })

require('./database').migrate()

require('./app').listen(process.env.PORT, () => {
  console.log(`Server started and listening to port ${process.env.PORT}`)
})

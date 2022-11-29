require('dotenv').config({ path: '/opt/projects/movie/api/.env' })

const app = require('express')()

require('./database').migrate()

app.get("/", (req, res) => {
  return res.json({ message: 'success' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server started and listening to port ${process.env.PORT}`)
})

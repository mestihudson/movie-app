const express = require('express')
const app = express()

app.get("/", (req, res) => {
  return res.json({ message: 'success' })
})

app.listen(process.env.PORT, () => {
  console.log('Server started and listening to port 3000')
})

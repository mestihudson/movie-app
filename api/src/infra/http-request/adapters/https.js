const https = require("https")
const qs = require('querystring')

module.exports = ({ url, params }) => {
  return new Promise((resolve, reject) => {
    const query = qs.stringify(params)
    const path = `${url}?${query}`

    https
      .get(path, (res) => {
        var chunks = []

        res.on("data", (chunk) => {
          chunks.push(chunk)
        })

        res.on("end", () => {
          const data = JSON.parse(Buffer.concat(chunks))
          resolve({ data })
        })
      })
        .on('error', (error) => {
            reject(error)
        })
  })
}

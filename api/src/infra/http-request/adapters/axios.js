const axios = require('axios')

module.exports = ({ url, params }) => {
  return axios.get(url, { params })
}

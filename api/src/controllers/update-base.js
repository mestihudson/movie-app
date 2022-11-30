const useCase = require('../usecases/update-base')

module.exports = (req, res) => {
  return useCase()
    .then((result) => {
      return res.json({ modified: result.length > 0 })
    })
}

const axios = require('axios')

module.exports = () => {
  return axios
    .get('https://ghibliapi.herokuapp.com/films')
    .then(({ data: films }) => {
      const movies = films
        .map(({
            id: originalId, title, description, director, producer,
            movie_banner: banner, image: poster
          }) => ({
            originalId, title, description, director, producer, banner, poster
        }))
      return Promise.resolve(movies)
    })
}

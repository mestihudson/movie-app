const { knex } = require('../database')
const axios = require('axios')

module.exports = () => {
  return axios
    .get('https://ghibliapi.herokuapp.com/films')
    .then(({ data: films }) => {
      const movies = films.map(({
        id: originalId, title, description, director, producer, movie_banner: banner,
        image: poster}) => ({
        originalId, title, description, director, producer, banner, poster
      }))
      return knex
        .insert(movies, ['id'])
        .into('movie')
        .then((result) => {
          return Promise.resolve(result)
        })
    })
}

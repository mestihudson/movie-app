const nock = require('nock')

const mockTmdbCall = async () => {
  const id = 6346649
  nock('https://api.themoviedb.org')
    .get('/4/list/1')
    .reply(200, {
      "total_pages": 1,
      "total_results": 1,
      "results": [{
        id,
        "media_type": "movie",
        "backdrop_path": "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
        "poster_path": "/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
        "title": "Spider-Man: No Way Home",
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      }]
    })
    .get(`/3/movie/${id}/credits`)
    .reply(200, {
      id,
      crew: [{
          "name": "Anthony Russo",
          "job": "Director",
        },{
          "name": "Joe Russo",
          "job": "Director",
        },{
          "name": "Kevin Feige",
          "job": "Producer"
      }],
    })
  ;
}

module.exports = { mockTmdbCall }

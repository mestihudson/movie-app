const nock = require('nock')
const getMovies = require('../../../../../src/services/get-movies/adapters/tmdb')

beforeEach(() => {
  nock.cleanAll()
})

it('should retrieve data from tmdb api', async () => {
  nock('https://api.themoviedb.org')
    .get('/4/list/1')
    .reply(200, {
      "total_pages": 1,
      "total_results": 1,
      "results": [{
        "id": 634649,
        "media_type": "movie",
        "backdrop_path": "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
        "poster_path": "/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
        "title": "Spider-Man: No Way Home",
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      }]
    });

  const movies = await getMovies()
  expect(movies).toHaveLength(1)
})


it('should call tmdb api such times as total pages is', async () => {
  nock('https://api.themoviedb.org')
    .get('/4/list/1')
    .reply(200, {
      "page": 1,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        "id": 1,
        "media_type": "movie",
        "backdrop_path": "/1b.jpg",
        "poster_path": "/1p.jpg",
        "title": "1t",
        "overview": "1d",
      }]
    })
    .get('/4/list/1')
    .reply(200, {
      "page": 2,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        "id": 2,
        "media_type": "movie",
        "backdrop_path": "/2b.jpg",
        "poster_path": "/2p.jpg",
        "title": "2t",
        "overview": "2d",
      }]
    })
    .get('/4/list/1')
    .reply(200, {
      "page": 3,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        "id": 3,
        "media_type": "movie",
        "backdrop_path": "/3b.jpg",
        "poster_path": "/3p.jpg",
        "title": "3t",
        "overview": "3d",
      }]
    })
  ;

  const movies = await getMovies()
  expect(movies).toHaveLength(3)
})

fit('should retrieve data about director and producer', async () => {
  const id = 271110
  nock('https://api.themoviedb.org')
    .get('/4/list/1')
    .reply(200, {
      "page": 1,
      "total_pages": 1,
      "total_results": 1,
      "results": [{
        id,
        "media_type": "movie",
        "backdrop_path": "/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg",
        "overview": "Following the events of Age of Ultron, the collective governments of the world pass an act designed to regulate all superhuman activity. This polarizes opinion amongst the Avengers, causing two factions to side with Iron Man or Captain America, which causes an epic battle between former allies.",
        "poster_path": "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
        "title": "Captain America: Civil War",
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

  const movies = await getMovies()
  expect(movies).toEqual([
    expect.objectContaining({
      director: expect.any(String),
      producer: expect.any(String),
    })
  ])
})

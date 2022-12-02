const nock = require('nock')

const getMovies = require('../../../../../src/services/get-movies/adapters/tmdb')

const { mockTmdbCall } = require('./helpers')

beforeEach(() => {
  nock.cleanAll()
})

it('should retrieve data from tmdb api', async () => {
  await mockTmdbCall()
  const movies = await getMovies()
  expect(movies).toHaveLength(1)
})

it('should call tmdb api such times as total pages is', async () => {
  const id = 6346649
  nock('https://api.themoviedb.org')
    .get('/4/list/1')
    .reply(200, {
      "page": 1,
      "total_pages": 3,
      "total_results": 3,
      "results": [{
        id,
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
        id,
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
        id,
        "media_type": "movie",
        "backdrop_path": "/3b.jpg",
        "poster_path": "/3p.jpg",
        "title": "3t",
        "overview": "3d",
      }]
    })
    .get(`/3/movie/${id}/credits`)
    .times(3)
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
  expect(movies).toHaveLength(3)
})

it('should retrieve data about director and producer', async () => {
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
